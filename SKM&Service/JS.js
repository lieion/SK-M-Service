var viz;

    function draw() {
        File_info_Json_Array = [];
        
        //config 형식에 맞춰어서 작성 
        var config = {
            container_id: "viz",
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "1234", 
            labels: { 
               "Product": { 
                   "caption": "title", 
                   "size": "pid" ,
                 // "sizeCypher": "match(p:product) where p.pid = '"+ center_of_graph +"' return count(*) as count",
                   "community":"community"
                }
              },
              relationships: {
                 "CO_PURCHASE":{
                     "caption":false,
                      "thickness": "weight",
                      'color':'red'
                }
              },    
              // pid가 jsoned3 인 노드로 부터 1~ num 거리에 있는 것들을 최대 limit_num만큼 출력 
              initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ center_of_graph +"'}) RETURN p LIMIT "+limit_num+"",
              arrows:true,
              hierarchical_layout:true,
              hierarchical_sort_method:"directed"

        };
        cyphermethod= "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ center_of_graph +"'}) RETURN p LIMIT "+limit_num+"";
      viz = new NeoVis.default(config);
      var forprint= JSON.stringify(viz._nodes);
      viz.render();
      
  }




  function draw_by_menu() {
        File_info_Json_Array = [];
        //config 형식에 맞춰어서 작성 
        center_of_graph=jsoned4;
        var config = {
            container_id: "viz",
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "1234", 
            arrow: true,
            labels: { 
               "Product": {
                   "caption": "title",
                   "size": "pid",
                   "community":"community"
                   //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
                }
              },
              relationships: {
                 "CO_PURCHASE":{
                     "caption": false,
                      "thickness": "weight"
                }
              },    
              // pid가 jsoned3 인 노드로 부터 1~ num 거리에 있는 것들을 최대 limit_num만큼 출력 
              initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ center_of_graph +"'}) RETURN p LIMIT "+limit_num+""

                    

        };
        console.log("MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ center_of_graph +"'}) RETURN p LIMIT "+limit_num+"");
      cyphermethod= "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ center_of_graph +"'}) RETURN p LIMIT "+limit_num+"";
      viz = new NeoVis.default(config);
      
      viz.render();
      
  }
    /*
      이 함수는 검색 기능에 사용 된다 .
      edge를 출력 안하는 것이 특징이다. 
    */
    function draw_by_name() {
        var config = {
            container_id: "viz",
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "1234",
            labels: { 
               "Product": {
                   "caption": "title",
                   "size": "pid",
                   "community":"community"
                }
              },
              relationships: {
                 "CO_PURCHASE":{
                     "caption": false,
                      "thickness": "weight"
                }
              },    
              // Product title에 검색어가 있는 product를 개수 제한 없이 가져오는 역할
              //initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '1151183'}) RETURN p LIMIT "+limit_num+"",
              //initial_cypher: "MATCH (product1)-[r:CO_PURCHASE*1..2]->(product2 ) WHERE product1.title CONTAINS \'"+search_text+"\' RETURN product1",
              initial_cypher: "MATCH (product) WHERE product.title CONTAINS \'"+search_text+"\' RETURN product",
              arrows:true,
              hierarchical_layout:true,
              hierarchical_sort_method:"directed"   
        };
        
      viz = new NeoVis.default(config);
      viz.render();
    }


    function draw_Union() {
      File_info_Json_Array = [];
      cyphermethod += " UNION MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ jsoned4+"'}) RETURN p LIMIT "+limit_num+"";
      
      console.log(cyphermethod);
      //config 형식에 맞춰어서 작성 
      var config = {
        container_id: "viz",
        server_url: "bolt://localhost:7687",
        server_user: "neo4j",
        server_password: "1234", 
        arrow: true,
        labels: { 
           "Product": {
               "caption": "title",
               "size": "pid",
               "community":"community"
               //"sizeCypher": "MATCH (n) WHERE id(n) = {id} MATCH (n)-[r]-() RETURN sum(r.weight) AS c"
            }
          },
          relationships: {
             "CO_PURCHASE":{
                 "caption": false,
                  "thickness": "weight"
            }
          },    
          // pid가 jsoned3 인 노드로 부터 1~ num 거리에 있는 것들을 최대 limit_num만큼 출력 
          initial_cypher: cyphermethod
      };
    
        
      viz = new NeoVis.default(config);
      console.log(viz._nodes);
      var forprint= JSON.stringify(viz._nodes);
      console.log(forprint);
      //  console.log(viz._nodes[48].title);
      //var ann = JSON.stringify(viz._nodes[28])['title'];
      //console.log(ann);
      hide_Info();
      hide_Length();
      viz.render();
      
  }
    


    function hide_Info(){
      $(".jb-footer").hide();
    }
    function show_Info(){
      $(".jb-footer").slideToggle(300,"linear");
    }

    function hide_Info_Smoothly(){
      $(".jb-footer").slideUp(300,"linear");
    }
    function hide_Length(){
      $(".jb-length").hide();
    }
    function show_Length(){
      $(".jb-length").slideToggle(300,"linear");
    }

    function hide_Length_Smoothly(){
      $(".jb-length").slideUp(300,"linear");
    }

  function search_tool_internet(){
    window.open('about:blank').location.href="https://www.google.com/search?ei=8M4vXbq3Bc-zmAWIgKVQ&q="+searched+"+&oq="+searched+"&gs_l=psy-ab.3..35i39j0i20i263j0l8.643015.654481..654637...13.0..1.104.956.9j1......0....1..gws-wiz.....10..0i71j0i67j0i10j0i131i20i263j0i131.XXEsDrrQABs&ved=0ahUKEwi67_v6q73jAhXPGaYKHQhACQoQ4dUDCAo&uact=5";
    //새탭에서 검색 결과가 나오도록 한다. 

  }

  function making_Excel(){
    File_info_Json_Array_Final=[];
    File_info_Json_Array_Check=[];
    $.each(File_info_Json_Array,function(i,value){
            console.log(value['pid']);
            if(File_info_Json_Array_Check.indexOf(value['pid']) == -1 ) {
              File_info_Json_Array_Final.push(value);
              File_info_Json_Array_Check.push(value['pid']);
            }
        });
    console.log(File_info_Json_Array_Final);

    $("#dvjson").excelexportjs({
                    containerid: "dvjson"
                       , datatype: 'json'
                       , dataset: File_info_Json_Array_Final
                       , columns: getColumns(File_info_Json_Array_Final)     
                });

    var _gaq = _gaq || [];


  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  }

  function sample() {
        
        var background = document.getElementById('jb-content').style.background;
        if(background == "") {
            document.getElementById('jb-content').style.background = "#fff"; 
        }
            
        html2canvas(document.getElementById('jb-content'), {
            useCORS: true, // 다른사이트의리소스가있을때활성화(그러나...Access-Control-Allow-Origin 필요)
            onrendered: function(canvas) {
                canvas.toBlob(function(blob) {
                    saveAs(blob, 'download.png');
                });
                
                // $("#test").html('<img src=' + canvas.toDataURL("image/png") + '>');
            }
        });
    }
  /*
  var input: 연관 거리를 받는 입력 폼에서 숫자를 받아와서 저장한다.
  1~5 범위의 수인 경우 지정된 연관 거리를 변경하고 그래프를 그려주지만 그렇지 않은 경우 경고문을 띄우고 다시 입력하게 한다.
*/
function ioput(){ 
    var input = document.getElementById("input").value;
    if(input>5 || input<1){ // 사용자가 억지로 1~5 범위의 숫자를 넣지 않으면 경고문을 통해서 다시 입력하게 한다. 
        alert("write valid number!!!!(1~5)"); 
    }
    else{
        num = input; //제대로 된 범위의 숫자를 넣어만 draw()함수를 실행하게 한다. 
        draw();
    }
}

/*
  var input: 연관 상품 최대 개수를 입력하는 입력 폼에서 사용자가 입력한 정보를 받아오고 input에 저장한다. 
  0~250범위의 숫자가 아닌 경우 경고문을 띄운다. 이외의 경우에는 지정된 limit_num을 입력 받은 값으로 변경하고 
  draw()함수를 이용하여 GraphDB를 다시 그려준다
*/
function limit_ioput(){
	var input = document.getElementById("li_input").value; 
	if(input>250 || input<0){
        alert("write valid number!!!!(0~250)");
    }
    else{
        limit_num = input;
        draw();
    }
}
/*
var input : 검색어를 입력하는 입력폼에서 사용자가 입력한 정보를 받아와서 넣어줌
이후 search_text를 input값으로 변경해준 뒤 draw_by_name() 함수를 실행한다. 
*/
function search_ioput(){ 
	var input = document.getElementById("search_input").value; 
	search_text=input;
	draw_by_name();
}