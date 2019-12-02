var viz;
function not_draw() {
        File_info_Json_Array = [];
        table_input="";
        //config 형식에 맞춰어서 작성 
        var config = {
            container_id: "viz",
            server_url: "bolt://localhost:7687",
            server_user: "neo4j",
            server_password: "1234", // 자신의 비밀번호를 입력 
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
              initial_cypher: "MATCH (product1:Product) WHERE product1.title CONTAINS \'"+search_input+"\' RETURN product1"

                    

        };

      console.log("here");
      viz = new NeoVis.default(config);
      viz.render();
      
  }


function getParameterByname(name, url){
  if(!url) url=window.location.href;
  name = name.replace(/[\[\]]/g,"\\$&");
  var regex=new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  return results[2];
}