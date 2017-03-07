
let promise = fetch(
  'https://api.github.com/users/addyosmani/orgs',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' //added token space authentication key
    }
  }
);

promise.then(function getOrganizations(organization) { //promise function to gather data from fetch
  // console.log(organization);

if (organization.status > 199 && organization.status < 300) { //handles errors effectively. prints out problem string if something goes wrong

  organization.json().then( function printOrgData(orgData) {
    orgData.forEach(function loginNames(org) { //wanted to loop through each object in the organization data
      console.log(org.login, org.avatar_url); //logs out data...we referenced login and org.avatar_url to specifically call these properties

      let orgLi = document.createElement('li'); //creates an 'li' out in space in JS
      let orgImg = document.createElement('img'); //create an 'img' out in space in JS
      orgImg.setAttribute('src', org.avatar_url); //didn't put org.avatar_url in '' because it was already a string

      orgLi.innerText = org.login; //puts the login value in the li's inner text
      orgLi.appendChild(orgImg); //appends the orgImg into the orgLi

      document.querySelector('#organizations ul').appendChild(orgLi); //put Li into the first ul in #organizations
    });
  });

} else { //there was a problem....tell the user
  console.log( "There was a problem. Please wait.", organization.status ); //prints this out if something goes wrong ie.404
}

});
