async function allUsers(req, res) {
  try {
    console.log("userId", req.userId);
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
