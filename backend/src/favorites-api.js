import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./emp_database.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE IF NOT EXISTS user_favorites( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
            user_id TEXT NOT NULL,\
            recipe TEXT NOT NULL,\
            playlist_id TEXT  NOT NULL\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
        });
    }
});

export const getUserFavorites = async (req, res) => {
    let userId = req.session.user?.id;
    if (userId) {
        db.all(`SELECT id, user_id, recipe, playlist_id FROM user_favorites WHERE user_id = ?`, [userId], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            const result = rows.map(row => {
                let recipe = JSON.parse(row.recipe);
                return {id:row.id, playlist_id:row.playlist_id, recipe};});
            res.status(200).json( result );
        });
    } else {
        return res.sendStatus(401);
    }
};

export const addUserFavorite = async (req, res) => {
    let userId = req.session.user?.id;
    if (userId) {
        const recipe = JSON.stringify(req.body.recipe);
        db.run(`INSERT INTO user_favorites (user_id, recipe, playlist_id) VALUES (?,?,?)`,
            [userId, recipe, req.body.playlist_id],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(201).json({
                    "id": this.lastID
                })
            });
    } else {
        return res.sendStatus(401);
    }
};

export const deleteUserFavorite = async (req, res) => {
    // Extract user ID from the session
    let userId = req.session.user?.id;

    // Check if user ID exists
    if (userId) {
        // Execute the DELETE query
        db.run(`DELETE FROM user_favorites WHERE id = ? AND user_id = ?`,
            [req.params.id, userId],
            function (err, result) {
                if (err) {
                    // Handle error
                    res.status(400).json({ "error": res.message });
                    return;
                }
                // Send response indicating success
                res.status(200).json({ deletedID: this.changes });
            });
            console.log(req.params.id, userId);
    } else {
        // User not authenticated, send unauthorized status
        return res.sendStatus(401);
    }
};

