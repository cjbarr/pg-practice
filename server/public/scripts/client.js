$(document).ready(onReady);

function onReady(){
    console.log('yoo');
    getSongs();
}

function getSongs(){
    //make an ajax request
    $.ajax({
        type:'GET',
        url:'songs'
    }).then(function(response){
        console.log('back from get with', response);

    }).catch(function(err){
        console.log(err);
        alert('not working');
    })//end ajax
}//end get