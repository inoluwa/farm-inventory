var loginUrl = "https://naomi-project-test.herokuapp.com";
function loginUser(){
    let username = document.getElementById('typeEmail').value;
    let password = document.getElementById('typePassword').value;

    if(!(username && password)) {
    alert('invalid/ empty input ')
        return ;
    }


    var bodyParam=JSON.stringify({
    username,
    password
});
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //myHeaders.append("")
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body:bodyParam
    };
    fetch(`${loginUrl}/api/login`, requestOptions)
   .then(responseType=>responseType.json())
   .then(res=>{
       if(res.statusCode=='00'){

    sessionStorage.setItem('token', res.token);

        window.open('/eggmgt.html', "_self");


       }

   })
    .catch(error => console.error("Unable to login.", error));
    
}
