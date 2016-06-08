
$(function(){
	//Make request when jQuery is available
    $.get("http://localhost:3000/playList").then(function(data){
        var playA=data.playlist.a;
        var index=0;
        populateTable(playA);
        $('#tblid').on("click","td a",function(e){
            $("#formPopUp").toggleClass("showPopUp");
            $("#container").toggleClass("parcialOpacity");
            index= e.target.id;
            $("input").each(function(item){
                console.log(item,this);
                this.value=playA[index][this.id];
            });
            e.preventDefault();
        });
        $('#formPopUp').on("submit",function(e){
            e.preventDefault();
            console.log()
            var url="http://localhost:3000/playlist/"+playA[index]["artist_id"]+$('form').serialize();
            $.get(url).then(function(data){
                $("input").each(function(item){
                    console.log(item,this);
                    playA[index][this.id]=this.value;
                });
                populateTable(playA);
                $("#container").toggleClass("parcialOpacity");
                $("#formPopUp").toggleClass("showPopUp");
            });

        });
        $('#cancel').on("click",function(e){
            e.preventDefault();
            $("#container").toggleClass("parcialOpacity");
            $("#formPopUp").toggleClass("showPopUp");
        });
    });

    function createRow(data,index){
       return $("<tr id="+data['artist_id']+"><td>"+index+"</td><td><img src="+data["image"]+"></td><td>"+data["title"]+"</td><td>"+data["artist"]+"</td><td>"+data["label"]+"</td><td><a href=# id="+index+">Edit</a></td></tr>");
    }
    function populateTable(data){
        var table=$('#tblid');
        table.empty();
        for(var i=0;i<10;i++){
            var row=createRow(data[i],i);
            table.append(row);
        }
    }


});