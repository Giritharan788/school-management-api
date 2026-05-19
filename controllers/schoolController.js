const db = require('../config/db');
const { z } = require('zod');

const addSchoolSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    address: z.string().min(1, 'Address is required').max(500),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

const listSchoolsSchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180)
});

exports.addSchool = async (req, res) => {
    try {
        const parsedData = addSchoolSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                error: 'Validation failed',
                details: parsedData.error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        const { name, address, latitude, longitude } = parsedData.data;

        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, address, latitude, longitude]);

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId
        });

    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.listSchools = async (req, res) => {
    try {
        const parsedData = listSchoolsSchema.safeParse(req.query);
        if (!parsedData.success) {
            return res.status(400).json({
                error: 'Validation failed. Latitude and longitude are required and must be valid numbers.',
                details: parsedData.error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }))
            });
        }

        const { latitude: userLat, longitude: userLon } = parsedData.data;

        // Haversine formula - 6371 is Earth's radius in km
        const query = `
            SELECT id, name, address, latitude, longitude,
            (
                6371 * acos(
                    cos(radians(?)) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(?)) + 
                    sin(radians(?)) * sin(radians(latitude))
                )
            ) AS distance
            FROM schools
            ORDER BY distance ASC
        `;

        const [schools] = await db.execute(query, [userLat, userLon, userLat]);

        res.status(200).json({
            message: 'Schools fetched successfully',
            count: schools.length,
            schools
        });

    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
