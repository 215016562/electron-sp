var db = openDatabase("myDB","1.0","serialport storage",1024*100);
db.transaction(function(tx){
    tx.executeSql("create table if not exists serialport(id text,com text)",[]);
    // tx.executeSql("insert into serialport(id, com)values()",[]);
    // tx.executeSql("select * from MsgData",[],function(tx,rs){
    //     removeAllData();
    //     for(var i=0;i<rs.rows.length;i++){
    //         showData(rs.rows.item(i));
    //     }
    // });
}) 
