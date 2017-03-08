
let promise = fetch( //running fetch function (only can have 2 arguments, second argument can hold alot since it is an object)
'https://api.github.com/users/addyosmani/orgs',
{
  method: 'GET',
  headers: { //can have as many headers as we want
    Authorization: 'token ' //added token space authentication key //authorizes the fetch request
  }
}
); //fetch does not give you data. it gives you a PROMISE

promise.then(function getOrganizations(response) { //promise function to gather data from fetch. the first .then of a function is RESPONSE
  // console.log(response);
  
  if (response.status > 199 && response.status < 300) { //handles errors effectively. prints out problem string if something goes wrong
    //if we get the correct status code...
    response.json().then( function printOrgData(orgData) { //json instead of text bc github gives back data in json format //argument is always data
      orgData.forEach(function loginNames(org) { //wanted to loop through each object in the organization data
        console.log(org.login, org.avatar_url); //logs out data...we referenced login and org.avatar_url to specifically call these properties

        let orgLi = document.createElement('li'); //creates an 'li' out in space in JS

        let orgImg = document.createElement('img'); //create an 'img' out in space in JS
        orgImg.setAttribute('src', org.avatar_url); //didn't put org.avatar_url in '' because it was already a string
        //
        let orgHeader = document.createElement('h2');
        orgHeader.innerText = org.login;

        orgLi.appendChild(orgImg); //appends the orgImg to the end, into the orgLi
        orgLi.appendChild(orgHeader);
        document.querySelector('#organizations ul').appendChild(orgLi); //put Li into the first ul in #organizations
      });
    });

  } else { //there was a problem....tell the user
    let errorMessage = document.querySelector('.error');
    let errorCode = organization.status;
    errorMessage[0].innerText = 'Error ' + errorCode ;
    // console.log( "There was a problem. Please wait.", organization.status ); //prints this out if something goes wrong ie.404
  }

});
