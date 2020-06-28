$(function(){
  if (window.parent.screen.width < 767) {
    var aTags = $('a'); //ページ内のaタグ群を取得。aTagsに配列として代入。
    aTags.each(function(){ //全てのaタグについて処理
      var url = $(this).attr('href');//aタグのhref属性からリンク先url取得
      $(this).removeAttr('href');//念のため、href属性は削除
      $(this).click(function(){//クリックイベントをバインド
        location.href = url;
      });
    });
  }
  
  $('.change-num').click(function(){
    var that = $(this);
    var ps = {};
    ps['zairyo'] = [];

    var v = $(this).prev().find('input').val();
    var n = $(this).parents('.card').find('.num').text(v);
    var t = $(this).parents('.card').find('.card-title').text();
    var trs = $(this).parents('.card-body').find('tr');
    trs.each(function(){
      ps['zairyo'].push($(this).find('td').eq(0).text());
    });

    ps['number'] = v;
    ps['title'] = t;


    //データ送信
    $.ajax({
      url: '../db/action_number.php',
      type: 'post',
      dataType: 'json',
      data: ps,
      timeout: 10000,  // 単位はミリ秒
    }).then(
        // 1つめは通信成功時のコールバック
        function (data) {
            // console.log(data);
            // console.log(data.sum);
            // console.log(that.parents('.card').find('.pri').text());
            that.parents('.card').find('.pri').text(data['sum']);

            trs.each(function(i, v){
              if (i==0) {
                return true;
              }
              $(this).find('td').eq(1).text(data['amo'][i-1]);
              $(this).find('td').eq(2).text(data['pri'][i-1]);
            });

        },
        // 2つめは通信失敗時のコールバック
        function (a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
          alert('エラー：通信状態をお確かめのうえもう一度お願いします。');
    });
  });


  //リロードボタン実装、はじめにテーブルごとにデータを変数に入れておく、タイトルをクリックしてテーブルを開いたとき
  var card_headers = [];
  var card_tables = [];
  var flags = [];

  // $('.card-header').click(function(){
  //   $(this).next().slideToggle();
  //   $(this).find('.desc').slideToggle();
  //   var id = $(this).parent('.card').attr('id');
  //   if (flags[id] != 'false') {
  //     card_headers[id] = $(this).html();
  //     card_tables[id] = $(this).parent('.card').find('table').html();
  //   }
  //   flags[id] = 'false';
  // });
  $('.reset').click(function(){
    var id = $(this).parents('.card').attr('id');
    $(this).parents('.card').find('.card-header').html(card_headers[id]);
    $(this).parents('.card').find('table').html(card_tables[id]);
  });
});
