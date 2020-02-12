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
    $('#addSongButton').on('click', addSong);
    $('#displaySpot').on('click', '.deleteButton', deleteSong)
}


function deleteSong(){
let selectedId = $(this).parent().data('id');
console.log(selectedId);
  $.ajax({
      type: 'DELETE',
      url: `/songs/${selectedId}`
  }).then(function (response) {
      console.log('back from get with', response);
      getSongs();
  }).catch(function (err) {
      console.log(err);
      alert('not working');
  }) //end ajax
}



function getSongs(){
    //make an ajax request
    $.ajax({
        type:'GET',
        url:'/songs'
    }).then(function(response){
        console.log('back from get with', response);
        displaySongs(response);
    }).catch(function(err){
        console.log(err);
        alert('not working');
    })//end ajax
}//end get

function displaySongs(responseArray){
    let el = $('#displaySpot');
    el.empty();
    for(i=0;i<responseArray.length;i++){
        el.append(`<li data-id=${responseArray[i].id}>(${responseArray[i].id})${responseArray[i].artist}<br> ${responseArray[i].track}<button class='deleteButton'>Delete</button></li><br><br>`)
    }
}