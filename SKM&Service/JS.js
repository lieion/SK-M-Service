var viz;

    function draw() {
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
              initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ jsoned3 +"'}) RETURN p LIMIT "+limit_num+""

              			

        };
		    console.log(num);
        console.log(jsoned3);
        console.log(limit_num);
        
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
              initial_cypher: "MATCH (product1:Product) WHERE product1.title CONTAINS \'"+search_text+"\' RETURN product1"


        };


      viz = new NeoVis.default(config);

	  viz.render();
    }
