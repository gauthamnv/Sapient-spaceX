let missions;
let brandsArr = [];


function fetchData(limit, launch, land, launchyear) {
  var uri = `https://api.spacexdata.com/v3/launches?`
  let limitUri = limit ? `limit=${limit}` : "";
  let launchUri = launch ? `&launch_success=${launch}` : "";
  let landUri = land ? `&land_success=${land}` : "";
  let launchyearUri = launchyear ? `&launch_year=${launchyear}` : "";

  var finalUri = `${uri}${limitUri}${launchUri}${landUri}${launchyearUri}`
  fetch(finalUri)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      missions = res;
      listing.createTemplate(res);
      // filters.createTemplate1(res);
    })
    .catch(error => console.error('Error:', error));
}

fetchData(100);


let listing = {
  createTemplate: (res) => {
    let outputTemplate = '';
    res.map((product) => {
      outputTemplate += listing.missionTemplate(product)
    })

    document.getElementById('listing').innerHTML = outputTemplate;
  },
  missionTemplate: (data) => {
    return `
        <div class="mission-grid">
            <div class="mission-content">
                <img src="${data.links.mission_patch_small}" alt="" />
                <h5>${data.mission_name} # ${data.flight_number}</h5>
                <h4>mission ids:</h4>
               <ul>
                <li>${data.mission_id}</li>
               </ul>
               <h6>Launch Year: <span>${data.launch_year} </span></h6>
               <h6>Successful launch: <span>${data.launch_success}</span> </h6>
               <h6><p>Successful landing:</p> <span>${data.rocket.first_stage.cores.land_success}</span> </h6>
            </div>
        </div>`
  }
}


let launchYearSel = document.querySelector('.launch-year');
launchYearSel.addEventListener('click', (event) => {
  let target = event.target.value;
  fetchData(100, '', '', target);
});

let launchSuccessSel = document.querySelector('.launch-success');
launchSuccessSel.addEventListener('click', (event) => {
  let target = event.target.value;
  fetchData(100, target, '', '');
});

let landingSuccessSel = document.querySelector('.landing-success');
landingSuccessSel.addEventListener('click', (event) => {
  let target = event.target.value;
  fetchData(100, '', target);
});