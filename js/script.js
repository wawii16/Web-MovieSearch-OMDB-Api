function searchMovie() {
    $('#movie-list').html('')

    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4dea8e60',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search
                $('#movie-list').prepend('<h2>Hasil Pencarian</h2>');

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-lg-3 mt-4 justify-content-center">
                    <div style="border-radius: 20px;" class="card" style="width: 100%;">
                        <img style="border-radius: 20px;" src="` + data.Poster + `" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 16px;">` + data.Title + `</h5>
                            <p class="card-text" style="font-size: 14px;">` + data.Year + `</p>   
                            <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `" style="font-size: 12px;">See Detail</a>
                        </div>
                    </div>
                </div>
                
                    `)


                })

                $('#search-input').val('')
            }
            else {
                $('#movie-list').html('<h1 class = "text-center">Movie Not Found!!</h1>')
            }
        }
    })
}
$('#search-button').on('click', function () {
    searchMovie();

})
$('#search-input').on('keyup', function (e) {
    if (e.key === "Enter") {
        searchMovie();
    }
})

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4dea8e60',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8 ">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</></li>
                                    <li class="list-group-item">Release Date : ` + movie.Released + `</li>
                                    <li class="list-group-item">Director : ` + movie.Director + `</li>
                                    <li class="list-group-item">Actor : ` + movie.Actors + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>
                                    <li class="list-group-item">Show Time : ` + movie.Runtime + `</li>
                                    <li class="list-group-item">Rated : ` + movie.Rated + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    })
})