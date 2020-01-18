var dbPromise = idb.open("football-app", 1, function(upgradeDb) {
    var teamObjecStore = upgradeDb.createObjectStore("teams", {keyPath:"id"});
    teamObjecStore.createIndex("name", "name", {unique:false});
})

function saveTeam(team) {
    dbPromise
     .then(function(db) {
         var tx = db.transaction("teams", "readwrite");
         var store = tx.objectStore("teams");
         console.log(team);
         store.put(team);
         return tx.complete;
     })
     .then(function() {
         console.log("Nama team berhasil tersimpan");
     });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromise
         .then(function(db) {
            var tx = db.transaction("teams", "readonly");
            var store = tx.objectStore("teams");
            return store.getAll();
         })
         .then(function(teams) {
            resolve(teams);
         });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromise
            .then(function(db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(function(val) {
                resolve(val);
            });
    });
}

function deleteTeam(teamId) {
    dbPromise
     .then(function(db) {
         var tx = db.transaction("teams", "readwrite");
         var store = tx.objectStore("teams");
         store.delete(teamId.id);
         return tx.complete;
     })
     .then(function() {
        console.log("Nama team berhasil terhapus!");
    });
}
