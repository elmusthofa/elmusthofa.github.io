const base_url = " https://api.football-data.org/v2/competitions/2021/standings";
const url = 'https://api.football-data.org/v2/teams/';

// Blok code yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu object menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok code untuk memparsing json menjadi array Javascript
function json(response) {
    return response.json();
}

// Blok code untuk meng-handle kesalahan di blok catch
function erro(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error: " + error);
}

// Blok code untuk melakukan request data json
function getStandings() {

    if ('caches' in window) {
        caches.match(base_url).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    // Menyusun komponen card clubs secara dinamis
                    var standings = "";
                    var standingElement = document.getElementById("body-content")
                    data.standings[0].table.forEach(function(standing) {
                        standings += `
                                    <tr style="cursor:pointer" onclick="location.href='./detail-team.html?id=${standing.team.id}'">
                                        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge" /></td>
                                        <td>${standing.team.name}</td>
                                        <td>${standing.won}</td>
                                        <td>${standing.lost}</td>
                                        <td>${standing.draw}</td>
                                        <td>${standing.points}</td>
                                    </tr>
                                
                        `;
                    });

                    standingElement.innerHTML = `
                    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                            <table class="highlight responsive-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Club</th>
                                        <th>Win</th>
                                        <th>Lost</th>
                                        <th>Draw</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>

                                <tbody id="standings">
                                    ${standings}
                                </tbody>
                            </table>
                    </div>
                    
                    `;
                })
            }
        })
    }

    fetch(base_url, {
        method: 'GET',
        headers: {
            'x-Auth-Token' : '3d95396d34d4452f81c0b54936ba38a5'
        }
    })
        .then(status)
        .then(json)
        .then(function(data) {
            var standings = "";
            var standingElement = document.getElementById("body-content");
                data.standings[0].table.forEach(function(standing) {
                    standings += `
                            <tr style="cursor:pointer" onclick="location.href='./detail-team.html?id=${standing.team.id}'">
                                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge" /></td>
                                <td>${standing.team.name}</td>
                                <td>${standing.won}</td>
                                <td>${standing.lost}</td>
                                <td>${standing.draw}</td>
                                <td>${standing.points}</td>
                            </tr>
                    `;
                });

                standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                        <table class="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Club</th>
                                    <th>Win</th>
                                    <th>Lost</th>
                                    <th>Draw</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${standings}
                            </tbody>
                        </table>
                </div>
                
                `;
                // Sisipkan komponen card ke dalam element dengan id #content
                console.log(data.standings[0].table);
        })
        // .catch(error);
}

function getDetailTeamById() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in  window) {
            caches.match(url + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        var detailTeamHTML = `
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves light>
                                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
                            </div>

                            <div class="card-content">
                                <span class="card-title">${data.name}</span>
                                <p>Address: ${data.address}</p>
                                <p>Founded: ${data.founded}</p>
                                <p>Phone: ${data.phone}</p>
                                <p>Email: ${data.email}</p>
                                <p>Stadium: ${data.venue}</p>
                                <p>Website: <a href='${data.website}'>${data.website}</a></p>
                            </div>
                        </div>
                        `;

                        document.getElementById("body-content").innerHTML = detailTeamHTML;
                        resolve(data);
                    })
                }
            })
        }

        fetch(url + idParam, {
            method: 'GET',
            headers: {
                'x-Auth-Token' : '3d95396d34d4452f81c0b54936ba38a5'
            }
        })
            .then(status)
            .then(json)
            .then(function(data) {
                var detailTeamHTML = `
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves light>
                                <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
                            </div>
    
                            <div class="card-content">
                                <span class="card-title">${data.name}</span>
                                <p>Address: ${data.address}</p>
                                <p>Founded: ${data.founded}</p>
                                <p>Phone: ${data.phone}</p>
                                <p>Email: ${data.email}</p>
                                <p>Stadium: ${data.venue}</p>
                                <p>Website: <a href='${data.website}'>${data.website}</a></p>
                            </div>
                        </div>
                        `;
    
                        document.getElementById("body-content").innerHTML = detailTeamHTML;
                        resolve(data);
                        console.log(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function(teams) {
        console.log(teams);

        // Menyusun komponen card artikel secara dinamis
        var tableTeam = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="highlight responsive-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Club</th>
                        <th>Liga</th>
                    </tr>
                </thead>

                <tbody id="team">
                
                </tbody>
            </table>
        </div>
        `;

        var listTeam = "";
        teams.forEach(function(team) {
            listTeam += `
            <tr style="cursor:pointer" onclick="location.href='./detail-team.html?id=${team.id}&saved=true'">
                <td><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge" /></td>
                <td>${team.name}</td>
                <td>${team.area.name}</td>
            </tr>
            `;
        });

        document.getElementById("body-content").innerHTML = tableTeam;
        document.getElementById("team").innerHTML = listTeam;
    })
}

function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then(function(team) {
        teamHTML = '';
        var teamHTML = `
            <div class="card">
                <div class="card-image waves-effect waves-block waves light>
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
                </div>

                <div class="card-content">
                    <span class="card-title">${team.name}</span>
                    <p>Address: ${team.address}</p>
                    <p>Founded: ${team.founded}</p>
                    <p>Phone: ${team.phone}</p>
                    <p>Email: ${team.email}</p>
                    <p>Stadium: ${team.venue}</p>
                    <p>Website: <a href='${team.website}'>${team.website}</a></p>
                </div>
            </div>
            `;
            document.getElementById('body-content').innerHTML = teamHTML;
            console.log(team);
        });
}