const ws = require('./module_/wscrapy');
const cheerio = require('cheerio');
const requestp = require('request-promise');
const csvjson = require('csvjson');
const fs = require('fs');
const rimraf = require('rimraf');
const partlist = require('./partlist')

const root = 'https://www.nipponsteel.com/'
const dist = '_html/';
const dPDF = '_pdf/'
const csvFile = './csv/uri.csv';
let csv_data = fs.readFileSync(csvFile, { encoding : 'utf8'});
const csvUri = csvjson.toObject(csv_data, { delimiter : ',',  quote: '"'}).map(v => v.uri.replace(/ +/g,''));

const isAuth = false;

const boxReset = false;
let templateFile = 'dummy.html'

// load uri in csv to promises
const promises = csvUri.map(url => requestp(url).catch(err => {
  errMsg = err.options.uri;
  return ''
}));

//loop for each uri
Promise.all(promises).then((data) => {
  data.forEach((valHTML, idx) => {
    doCheerio(valHTML, csvUri[idx].replace(root,''))

  })
}).then(()=>{/*do something*/})


var doCheerio = function (html,uri) {
  //path
  let dirlist = uri.split('/')
  let createPath = '/'+dist+dirlist.slice(0,-1).join('/')+'/'
  ws.createDir(createPath);
  ws.createDir('/'+dPDF)
  ws.createDir(createPath+'img/');
  let distPath = dist+dirlist.join('/')

  //content
  let content= html.replace(/(.*?|\n)*?<!-- ▼▼▼ ContentsArea Start ▼▼▼ -->/s,'').replace(/<!-- ▲▲▲　ContentsArea End　▲▲▲ -->(.*)/s,'')
  const $ = cheerio.load(content);

  $('#aside').remove();
  if(boxReset){
  $('.relatedBox01').remove()
  }
  let body =''
  let hasAncher = false;
  let g = ''

  $('*').each(function(){
    if($(this).is('h1.heading01')){
      body += partlist.box_title_1($(this).text())
    }
    if($(this).is('.anchorList01')){
      let anclist = []
        $(this).children().each(function(i){
          anclist.push({
            txt:$(this).text(),
            href:'#anc'+ws.zeroPad(i+1)
          })
        })
        body += partlist_anchor_01(anclist)
        hasAncher= true;
    }

    if($(this).is('h2.heading02')){
      if(hasAncher){
        body += partlist.title_2_bdb($(this).text(),"anc")
      }else{
        body += partlist.title_2_bdb($(this).text(),'')
      }
    }
    if($(this).is('h3.heading03')){
      body += partlist.title_cmn($(this).text(),3)
    }
    if($(this).is('h4.heading04')){
      body += partlist.title_cmn($(this).text(),4)
    }
    if($(this).is('p')){
      if (!$(this).children().is('a')
       && !$(this).is('.caption01')) {
         if($(this).hasClass('aR')){
          body += partlist.text_cmn(ws.clean($(this).html()),4,'right')
         }
         else if($(this).hasClass('aL')){
          body += partlist.text_cmn(ws.clean($(this).html()),4,'left')
         }
         else if($(this).parent().is('.detail')){
          //pass for card cmn
         }
         else{
          //text4
          body += partlist.text_cmn(ws.clean($(this).html()),4)
         }
      }

    }
    if ($(this).is('img')) {
      let src = $(this).attr('src')
      let alt = $(this).attr('alt')
      let cap = $(this).next().is('.caption01') ? ws.clean($(this).next().html()) : ''

      if (typeof src != "undefined")
      {
        if(typeof alt == "undefined"){alt = ''}
        if (!src.match(/common/)) {
          if($(this).parents('.figureContainer').html() && $(this).parents('.threeFrameColumn').length==0){
            let figureCon = $(this).parents('.figureContainer')
            if(figureCon.children().hasClass('figureLeft')){
              let txt = ws.clean(figureCon.children('.detail').html()).replace(/<p>/g,'<p class="txt-detail">')
              ws.getIMG(root + src, createPath.replace('/', '') + 'img/')
              body += partlist.card_text_and_image_left(src.replace(/images/g, 'img'),alt,cap,txt)
            }
            if(figureCon.children().hasClass('figureRight')){
              let txt = ws.clean(figureCon.children('.detail').html()).replace(/<p>/g,'<p class="txt-detail">')
              ws.getIMG(root + src, createPath.replace('/', '') + 'img/')
              body += partlist.card_text_and_image_right(src.replace(/images/g, 'img'),alt,cap,txt)
            }

          }
          else if($(this).parents('.relatedBox01').length >0){

          }
          else{
            ws.getIMG(root + src, createPath.replace('/', '') + 'img/')
            body += partlist.image_01(src.replace(/images/g, 'img'), alt, cap)
          }
        }

      }
    }
    if($(this).is('.relatedBox01')){
      if($(this).find('.heading')){
        body += partlist.title_cmn($(this).find('.heading').text(),4)
      }
      if($(this).children().is('.threeFrameColumn')){
        let card = $(this).find('.threeFrameColumn').children()
        let col = card.length;
        let card_data = []
        card.each(function(){
          if($(this).is('.col')){
            let aText = $(this).find('a').text()
            let aHref = $(this).find('a').attr('href')
            let img =[]
            if($(this).find('a').children().is('img')){
              img.push({
                src:$(this).find('a').children().attr('src'),
                alt:$(this).find('a').children().attr('alt'),
              })
            }
            card_data.push({
              link: {
                text:aText,
                link:aHref
              },
              img
            })
          }
        })
       body+= partlist.card_link_03(card_data)
      }
    }
    if ($(this).is('a')) {
      let href = $(this).attr('href')
      if(href.match(/\.pdf/)){
        let pdfPath = href.split('/').slice(1,-1).join('/')+'/'
        ws.createDir('/'+dPDF+pdfPath)
        ws.getPDF(root+href,{directory:dPDF+pdfPath},(err)=>{ if(err) throw err})
      }
      if (!$(this).parent().is('li')) {
        //link2
        if ($(this).parent().is('.iconLink01')) {
          if ($(this).attr('target')) {
            body += partlist.links_02($(this).text(), $(this).attr('href'));
          }
        }
      }
    }
    if($(this).is('.twoColumn')){
      if($(this).children().length == 2){
        $(this).children().each(function(){
          if($(this).children().is('img')){
            let src = $(this).children().attr('src')
            let alt = $(this).children().attr('alt')
            let cap = $(this).children().next()!=null?$(this).children().next().html():''
            if(cap != ''){
              // '<figcaption>'+cap+'</figcaption>'
            }
          }
        })
      }
    }
    if($(this).is('table')){
      if($(this).is('.tableType01')){
        let table = ws.clean($(this).find('tbody').html()).replace(/ class="[\w+\d+:;\.\s\(\)\-\,]*"/g,'')
        body += `<div class="table-cmn-01"><table><colgroup><col class="s-table-w-01"> <col></colgroup><tbody>` + table + `</tbody></table></div>`
      }
    }
    if ($(this).is('ol')) {
      body += '<ul class="list-cmn-04">'
      $(this).find('a').removeAttr('onclick')
      $(this).children().each(function () {
        $(this).children().remove('img')
        $(this).children().remove('span')
        if($(this).children().is('a')){
          $(this).children().addClass('link-pdf-02')
        }
        body += '<li>' + ws.clean($(this).html()).replace(/\<\/a>（PDF /g, '<span>（').replace(/\（PDF/g,'<span>（').replace(/\<\/a>/g,'') + '</span></a></li>'
      })
      body += '</ul>'
    }
    if ($(this).is('ul')) {
      if ($(this).is('.linkList01')) {
        body += '<ul class="list-links-01 column">'
        $(this).children().each(function () {
          $(this).children().remove('img')
          let hasPDF = $(this).children().attr('href').match(/\.pdf/);
          let hasDOC = $(this).children().attr('href').match(/\.doc/);
          if (hasPDF) {
            $(this).children().addClass('link-pdf-01')
            body += '<li>' + ws.clean($(this).html()).replace(/\<\/a>/g, '') + '</a></li>'

          } else if (hasDOC) {
            $(this).children().addClass('link-doc-01')
            body += '<li>' + ws.clean($(this).html()).replace(/\<\/a>/g, '') + '</a></li>'
          }
        })
        body += '</ul>'
      }
      if ($(this).is('.normalList01')) {
        body += '<ul class="list-cmn-01">'
        $(this).each(function () {
          body += ws.clean($(this).html())
        })
        body += '</ul>'
      }
    }

  })
  if(boxReset) {
    body =  '<div class="box-reset-counter">' +body + '</div>'
  }

  //////////////create file
  let dummy = fs.readFileSync(templateFile,'utf8',()=>{})
  dummy = dummy.replace(/########content####/g,body)
  ws.writeHTML(dummy,distPath)
  console.log(distPath+' done');
}



//////////////////////////////// partlist

partlist_anchor_01 = (link)=>{
  let li =''
  link.forEach(function(v){
    li += '<li><a href="'+v.href+'" class="anchor-link js-scroll">'+v.txt+'</a></li>'
  })
  return '<div class="box-anchor-link-01"><p class="txt-anchor-link-01 js-anchor-select">'+link[0].txt+'</p><ul class="list-anchor-link-01">'+li+'</ul></div>'
}

partlist_list = (txt, n) => {
  let arr = ''
  txt.forEach(ele => {
    arr += '<li>' + ele + '</li>'
  })
  return '<ul class="list-cmn-0' + n + '">' + arr + '</ul>'
}

