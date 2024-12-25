function addRecentId(newId) {
  const existingIds = JSON.parse(sessionStorage.getItem("recentids")) || [];

  if (!existingIds.includes(newId)) {
    existingIds.push(newId);

    sessionStorage.setItem("recentids", JSON.stringify(existingIds));
  }
}

function addId(newId) {
  const existingIds = JSON.parse(localStorage.getItem("ids")) || [];

  if (!existingIds.includes(newId)) {
    existingIds.push(newId);

    localStorage.setItem("ids", JSON.stringify(existingIds));
  }
}

export { addRecentId, addId };
