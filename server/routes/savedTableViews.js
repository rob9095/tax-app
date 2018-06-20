const express = require('express');
const router = express.Router();
const { getSavedTableViews, addSavedTableView, removeSavedTableView, toggleSharedView, setDefaultView, getUserDefaultView } = require('../handlers/savedTableViews');

// add saved table view -> /api/saved-views
router.post('/', addSavedTableView);

// set a default view for a user -> /api/saved-views/default
router.post('/default', setDefaultView)

// get a default view for a user -> /api/saved-views/default
router.get('/default/:user_id', getUserDefaultView)

// toggle isShared value for view -> /api/saved-views/share
router.post('/share', toggleSharedView);

// get saved table views for user -> /api/saved-views
router.get('/:user_id', getSavedTableViews);

// delete saved table view -> /api/invitations/:view_id
router.delete('/:view_id', removeSavedTableView);

module.exports = router;
