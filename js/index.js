// $(function(){
//
//   var  canvasS = 600;
//   var  row = 15;
//   var  blockS = canvasS/row;
//   ctx = $('#canvas').get(0).getContext('2d');
//   var  starRadius = 3;
//
//
//   $('#canvas').get(0).height = canvasS;
//   $('#canvas').get(0).width = canvasS;
//
//   var draw = function(){
//     var off = blockS/2 + 0.5;
//     var lineWidth = canvasS - blockS;
//
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(off,off);
//     for(var i = 0; i<row; i++){
//       ctx.moveTo(0,0)
//       ctx.lineTo(lineWidth,0);
//       ctx.translate(0,blockS);
//     }
//     ctx.stroke();
//     ctx.closePath();
//     ctx.restore();
//
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(off,off);
//     for(var i = 0; i<row; i++){
//       ctx.moveTo(0,0)
//       ctx.lineTo(0,lineWidth);
//       ctx.translate(blockS,0);
//     }
//     ctx.stroke();
//     ctx.closePath();
//     ctx.restore();
//
//     var points = [3.5*blockS+0.5 , 11.5*blockS + 0.5];
//     for(var i = 0; i< 2; i++){
//       for( var j=0; j<2; j++){
//         var x = points[i];
//         var y = points[j];
//         ctx.save();
//         ctx.beginPath();
//         ctx.translate(x, y);
//         ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
//         ctx.fill();
//         ctx.closePath();
//         ctx.restore();
//       }
//     }
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(7.5*blockS+0.5, 7.5*blockS + 0.5);
//     ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
//     ctx.fill();
//     ctx.closePath();
//     ctx.restore();
//   }
//   draw();
//
//   var qiziRadius = blockS/2*0.8;
//
//   var drop = function(qizi){
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate((qizi.x+0.5)*blockS + 0.5, (qizi.y+0.5)*blockS + 0.5);
//     ctx.arc(0,0,qiziRadius,0,Math.PI/180*360);
//     if( qizi.color === 1){
//       ctx.fill();
//     }else{
//       ctx.fillStyle = '#fff';
//       ctx.strokeStyle = 'black';
//       ctx.fill();
//       ctx.stroke();
//     }
//     ctx.closePath();
//     ctx.restore();
//   }
//
//   var kaiguan = true;
//   all = {};
//   var step = 1;
//
//   panduan = function(qizi){
//     var shuju = {};
//     $.each(all,function(k,v){
//       if( v.color === qizi.color ){
//         shuju[k] = v;
//       }
//     })
//     var shu = 1,hang=1,zuoxie=1,youxie=1;
//     var tx,ty;
//
//     /*|*/
//     tx = qizi.x; ty = qizi.y;
//     while ( shuju [ tx + '-' + (ty + 1) ]){
//       shu ++;ty++;
//     }
//     tx = qizi.x; ty = qizi.y;
//     while ( shuju [ tx + '-' + (ty - 1) ]){
//       shu ++; ty--;
//     }
//
//     /*-*/
//     tx = qizi.x ; ty = qizi.y;
//     while( shuju[ (tx+1) + '-' + ty ] ){
//       hang++;tx++;
//     }
//     tx = qizi.x ; ty = qizi.y;
//     while( shuju[ (tx-1) + '-' + ty ] ){
//       hang++;tx--;
//     }
//
//     tx = qizi.x; ty = qizi.y;
//     while( shuju[ (tx-1) + '-' + (ty-1) ] ){
//       zuoxie++;tx--;ty--;
//     }
//     tx = qizi.x ; ty = qizi.y;
//     while( shuju[ (tx+1) + '-' + (ty+1) ] ){
//       zuoxie++;tx++;ty++;
//     }
//
//     tx = qizi.x ; ty = qizi.y;
//     while( shuju[ (tx+1) + '-' + (ty-1) ] ){
//       youxie++;tx++;ty--;
//     }
//     tx = qizi.x ; ty = qizi.y;
//     while( shuju[ (tx-1) + '-' + (ty+1) ] ){
//       youxie++;tx--;ty++;
//     }
//
//     if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
//       return true;
//     }
//   }
//
//   $('#canvas').on('click',function(e){
//     var x = Math.floor(e.offsetX/blockS);
//     var y = Math.floor(e.offsetY/blockS);
//
//     if( all[ x + '-' + y ]){
//       return;
//     }
//
//     var qizi;
//
//     if(kaiguan){
//       qizi = {x:x,y:y,color:1,step:step};
//       drop(qizi);
//       if( panduan(qizi) ){
//         $('.cartel').show().find('#tishi').text('黑棋赢');
//       };
//     }else{
//       qizi = {x:x,y:y,color:0,step:step};
//       drop(qizi);
//       if( panduan(qizi) ){
//         $('.cartel').show().find('#tishi').text('白棋赢');
//       };
//     }
//     step += 1;
//     kaiguan = !kaiguan;
//     all[ x + '-' + y ] = qizi;
//
//   });
//
//   $("#restart").on('click',function(){
//     $('.cartel').hide();
//     ctx.clearRect(0,0,600,600);
//     draw();
//     kaiguan = true;
//     all = {};
//     step = 1;
//   })
//
//   $('#qipu').on('click',function(){
//     $('.cartel').hide();
//     $('#save').show();
//     ctx.save();
//     ctx.font = "20px consolas";
//     for( var i in all){
//       if( all[i].color === 1){
//         ctx.fillStyle = '#fff';
//       }else{
//         ctx.fillStyle = 'black';
//       }
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText(all[i].step,
//         (all[i].x+0.5)*blockS,
//         (all[i].y+0.5)*blockS);
//       }
//       ctx.restore();
//       var image = $('#canvas').get(0).toDataURL('image/jpg',1);
//       $('#save').attr('href',image);
//       $('#save').attr('download','qipu.png');
//     })
//
//     $('.tips').on('click',false);
//     $('#close').on('click',function(){
//       $('.cartel').hide();
//     })
//     $('.cartel').on('click',function(){
//       $(this).hide();
//     })
//   })
$(function(){

  var  canvasS = 600;
  var  row = 15;
  var  blockS = canvasS/row;
  var  ctx = $('#canvas').get(0).getContext('2d');
  var  starRadius = 3;
  var mode = true;


  $('#canvas').get(0).height = canvasS;
  $('#canvas').get(0).width = canvasS;

  $('.ops').on('click',function(){
    $('.side').removeClass('side');
    $(this).addClass('side')
    if($(this).attr('id')==="explain"){
      mode = false;
    }else{
      mode = true;
    }
  })

  var draw = function(){
    var off = blockS/2 + 0.5;
    var lineWidth = canvasS - blockS;

    ctx.save();
    ctx.beginPath();
    ctx.translate(off,off);
    for(var i = 0; i<row; i++){
      ctx.moveTo(0,0)
      ctx.lineTo(lineWidth,0);
      ctx.translate(0,blockS);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.translate(off,off);
    for(var i = 0; i<row; i++){
      ctx.moveTo(0,0)
      ctx.lineTo(0,lineWidth);
      ctx.translate(blockS,0);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
      // 五个小点
    var points = [3.5*blockS+0.5 , 11.5*blockS + 0.5];
    for(var i = 0; i< 2; i++){
      for( var j=0; j<2; j++){
        var x = points[i];
        var y = points[j];
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
    ctx.save();
    ctx.beginPath();
    ctx.translate(7.5*blockS+0.5, 7.5*blockS + 0.5);
    ctx.arc(0,0,starRadius,0,(Math.PI/180)*360);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  draw();

  var kongbai = {};
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      kongbai[ i + '-' + j] = true;
    }
  }


 //  var filter = function(color) {
 //   var r = {};
 //   for(var i in all){
 //     if(all[i].color === color){
 //       r[i] = all[i];
 //     }
 //   }
 //   return r;
 // }

 suanfa = function () {
    var max = -1000000; var xx = {};
    for ( var i  in kongbai){
      var pos = i;
      var aaa = {x:Number(pos.split('-')[0]),y:Number(pos.split('-')[1]),color:1}
      var x = panduan(aaa);
      if( x > max ){
        max = x;
        xx.x = pos.split('-')[0];
        xx.y = pos.split('-')[1];
      }
    }

    var max2 = -1000000; var yy = {};
    for ( var i  in kongbai){
      var pos = i;
      var bbb = {x:Number(pos.split('-')[0]),y:Number(pos.split('-')[1]),color:0}
      var x = panduan(bbb);
      if( x > max2 ){
        max2 = x;
        yy.x = pos.split('-')[0];
        yy.y = pos.split('-')[1];
      }
    }
    if( max2 >= max){
      return yy;
    }
    return xx;
  }


  var qiziRadius = blockS/2*0.8;

  var num = 0;
  var num1 = 0;

  var drop = function(qizi){
    console.log(all)
    ctx.save();
    ctx.beginPath();
    ctx.translate((qizi.x+0.5)*blockS + 0.5, (qizi.y+0.5)*blockS + 0.5);
    ctx.arc(0,0,qiziRadius,0,Math.PI/180*360);
    var JZ = ctx.createRadialGradient(0,0,15,-4,-4,2)
    JZ.addColorStop(0, 'black');
    JZ.addColorStop(0.9,'rgba(99,99,99,99)')
    JZ.addColorStop(1, 'rgba(122,122,122,1)');


    var JD = ctx.createRadialGradient(0,0,15,-4,-3,4)
    JD.addColorStop(0, 'rgba(244,244,244,1)');
    JD.addColorStop(0.9, 'rgba(255,255,255,1)');
    JD.addColorStop(1, 'rgba(255,255,255,1)');
    if( qizi.color === 1){
      ctx.fillStyle = JZ;
      ctx.fill();
      $('#side2').addClass('side')
      $('#side1').removeClass('side')
      num +=1;
      $('#side1').find('span').text(num);

    }else{
      ctx.fillStyle = JD;
      ctx.fill();
      $('#side1').addClass('side');
      $('#side2').removeClass('side')
      num1 +=1;
      $('#side2').find('span').text(num1);
    }
    ctx.closePath();
    ctx.restore();
  }

  var kaiguan = true;
  all = {};

  panduan = function(qizi){
    var shuju = {};
    $.each(all,function(k,v){
      if( v.color === qizi.color ){
        shuju[k] = v;
      }
    })
    var shu = 1,hang=1,zuoxie=1,youxie=1;
    var tx,ty;

    /*|*/
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty + 1) ]){
      shu ++;ty++;
    }
    tx = qizi.x; ty = qizi.y;
    while ( shuju [ tx + '-' + (ty - 1) ]){
      shu ++; ty--;
    }

    /*-*/
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + ty ] ){
      hang++;tx++;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + ty ] ){
      hang++;tx--;
    }

    tx = qizi.x; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty-1) ] ){
      zuoxie++;tx--;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty+1) ] ){
      zuoxie++;tx++;ty++;
    }

    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx+1) + '-' + (ty-1) ] ){
      youxie++;tx++;ty--;
    }
    tx = qizi.x ; ty = qizi.y;
    while( shuju[ (tx-1) + '-' + (ty+1) ] ){
      youxie++;tx--;ty++;
    }
    // if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
    //   return true;
    // }
    // console.log(hang,shu,zuoxie,youxie)
    return Math.max(hang,shu,zuoxie,youxie);

  }

  $('#canvas').on('click',function(e){
    var x = Math.floor(e.offsetX/blockS);
    var y = Math.floor(e.offsetY/blockS);
    if( all[ x + '-' + y ]){
      return;
    }
    var qizi;
    var qizis;

    if(!mode){
      if(kaiguan){
        qizi = {x:x,y:y,color:1};
        drop(qizi);
        if( panduan(qizi)>4 ){
          alert('黑棋获胜');
          window.location.reload();
        };
      }else{
        qizi = {x:x,y:y,color:0};
        drop(qizi);
        if( panduan(qizi)>4 ){
          alert('白棋获胜');
          window.location.reload();

        };
      }
      kaiguan = !kaiguan;
      all[ x + '-' + y ] = qizi;
    }else{
      // luozi(x,y,'black');
      //  qizi[ x + '-' + y ] = 'black';
      qizi = {x:x,y:y,color:1};
      drop(qizi);
      all[ x + '-' + y ] = qizi;
      delete kongbai[ x + '-' + y ];

      if( panduan(qizi) >= 5 ){
        alert('黑棋赢');
        window.location.reload();
      }
       var pos = suanfa();

      qizis = {x:Number(pos.x),y:Number(pos.y),color:0}
      drop(qizis)
      all[ pos.x + '-' + pos.y ] = qizis;
      //  luozi(pos.x,pos.y,'white');
      //  qizi[ pos.x + '-' + pos.y ] = 'white';
      delete kongbai[ pos.x + '-' + pos.y ];
      if( panduan(qizis) >= 5 ){
        alert('白棋赢');
        window.location.reload();
      };
    }



  });
  $('#play').on('click',function(){
    ctx.clearRect(0,0,canvasS,canvasS);
    draw();
    all = {};
    num = 0;
    num1 = 0;
    $('.side').removeClass('side')
    $('#side1').addClass('side').find('span').text('0');
    $('#side2').find('span').text('0');
    kaiguan = true;

  })

})
