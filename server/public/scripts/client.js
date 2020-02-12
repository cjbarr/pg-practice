$(document).ready(onReady);

function addSong(){
    console.log('in add Song');
    //get user input in an object
    //ajax call to server to POST user input
    let objectToSend={rank: $('#rankIn').val(),
                    artist: $('#artistIn').val(),
                    track: $('#trackIn').val(),
                    published: $('#publishedIn').val()
                }
$.ajax({
    type:'POST',
    url:'/songs',
    data: objectToSend
}).then( function(response){
    console.log('back from POST', response);
    getSongs();
    
}).catch(function(err){
alert('problem adding song');
console.log(err);
})//end ajax
}//end addSong

function onReady(){
    console.log('yoo');
    getSongs();
    $('#addSongButton').on('click', addSong)
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