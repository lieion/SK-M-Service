//hello
var viz;

    function draw() {

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
              
              initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : '"+ jsoned3 +"'}) RETURN p LIMIT "+limit_num+""

              			

        };
		    console.log(num);
        console.log(jsoned3);
        console.log(limit_num);
        
      viz = new NeoVis.default(config);
	  viz.render();
	}


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

              initial_cypher: "MATCH (product1:Product) WHERE product1.title CONTAINS \'"+search_text+"\' RETURN product1"


        };


      viz = new NeoVis.default(config);

	  viz.render();
    }

    function draw_by_id() {
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
                }
              },
              relationships: {
                 "CO_PURCHASE":{
                     "caption": false,
                      "thickness": "weight"
                }
              },    

              initial_cypher: "MATCH p=()-[r:CO_PURCHASE*1.."+num+"]->(product : Product {pid : "+ jsoned3 +"}) RETURN p LIMIT "+limit_num+""

              			
        };
        console.log(num);
        console.log(jsoned3);
        console.log(limit_num);
       
      viz = new NeoVis.default(config);
	  viz.render();
	}


    




