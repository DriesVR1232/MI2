<script>
        function myFunction() {
            var artiest = document.getElementById("myText").value;
            alert(artiest);
            if (artiest != "")
            {
                $.getJSON("http://www.songsterr.com/a/ra/songs.json?pattern=" + artiest, myFunction(result) )
                {
                    $.each(result, function (i, field) 
                            {
                        $("#div1").append(field + " ");
                    });
                };
            }
        }
    </script>