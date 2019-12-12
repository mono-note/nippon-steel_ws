const text_cmn = (txt,n,align)=>{
  if(align == 'right'){
  return `<p class="txt-cmn-0`+n+` s-ta-r">`+txt+`</p>`
  }else if(align == 'left'){
    return `<p class="txt-cmn-0`+n+` s-ta-l">`+txt+`</p>`
  }else if(align == 'center'){
    return `<p class="txt-cmn-0`+n+` s-ta-c">`+txt+`</p>`
  }else{
  return `<p class="txt-cmn-0`+n+`">`+txt+`</p>`
  }
}

const box_title_1 = (txt) => {
  return `<div class="box-cmn-title-03"><div class="box-title-in"><div class="box-title-left"><h1 class="ttl-cmn-01">` + txt + `</h1></div></div></div>`
}

const text_tooltips = (txt1, txt2) => {
  return `<p class="js-tooltip-wrap"><span class="js-tooltip-txt">` + txt1 + `</span> <span class="js-tooltip-box">` + txt2 + `</span></p>`
}

const list_text_2_col = (txt1,txt2) => {
  let template = '<div class="list-text-wrap container-fluid">\n<div class="row">\n<div class="list-text-col col-sm-12 col-md-6">\n'
  let arrTxt = ''
    txt1.forEach(ele => {
      arrTxt += '<p class="text">' + ele + '</p>\n'
    });
    template += arrTxt + '</div>\n<div class="list-text-col col-sm-12 col-md-6">\n'
    arrTxt = ''
    txt2.forEach(ele => {
      arrTxt += '<p class="text">' + ele + '</p>\n'
    });
    template += arrTxt + '</div>\n'
  return template + '</div>\n</div>'
}

const list_text_3_col = (txt1,txt2,txt3) => {
  let template = '<div class="list-text-wrap container-fluid">\n<div class="row">\n<div class="list-text-col col-sm-12 col-md-4">\n'
  let arrTxt = ''
    txt1.forEach(ele => {
      arrTxt += '<p class="text">' + ele + '</p>\n'
    });
    template += arrTxt + '</div>\n<div class="list-text-col col-sm-12 col-md-4">\n'
    arrTxt = ''
    txt2.forEach(ele => {
      arrTxt += '<p class="text">' + ele + '</p>\n'
    });
    template += arrTxt + '</div>\n<div class="list-text-col col-sm-12 col-md-4">\n'
    arrTxt = ''
    txt3.forEach(ele => {
      arrTxt += '<p class="text">' + ele + '</p>\n'
    });
    template += arrTxt + '</div>\n'
  return template + '</div>\n</div>'
}

const links = (link,n) => {
  if(n==1){
  return `<a href="` + link.href + `" class="link-cmn-0`+n+`">` + link.text + `</a>`
  }
  else if(n==2){

  }
}

const links_02 = (text, link) => {
  return `<a href="` + link + `" target="_blank" class="link-cmn-02">` + text + `</a>`
}

const links_03 = (text, link) => {
  return `<a href="` + link + `" class="link-cmn-03">` + text + `</a>`
}

const links_04 = (text, link, size) => {
  return `<a href="` + link + `" class="link-download-01">` + text + `<span>` + size + `</span></a>`
}

const links_05 = (text, link, size) => {
  return `<a href="`+ link +`" target="_blank" class="link-pdf-02">`+ text +`<span>` + size + `</span></a>`
}

const links_06 = (text, link) => {
  return `<a href="`+ link +`" target="_blank" class="link-pdf-01">`+ text +`</a>`
}

const links_07 = (text, link) => {
  return `<a href="`+ link +`" target="_blank" class="link-doc-01">`+ text +`</a>`
}

const links_right = (text, link) => {
  return `<div class="box-cmn-links-03 just-right"><a href="`+ link +`" class="link-cmn-01">`+ text +`</a></div>`
}

const btn_blue_medium = (text, link) => {
  return `<p class="btn-cmn-03"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_blue_medium_icon = (text, link) => {
  return `<p class="btn-cmn-03 ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const btn_blue_small = (text, link) => {
  return `<p class="btn-cmn-03 small"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_blue_small_icon = (text, link) => {
  return `<p class="btn-cmn-03 small ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const btn_white_medium = (text, link)  => {
  return `<p class="btn-cmn-04"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_white_medium_icon = (text, link)  => {
  return `<p class="btn-cmn-04 ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const btn_white_small = (text, link) => {
  return `<p class="btn-cmn-04 small"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_white_small_icon = (text, link) => {
  return `<p class="btn-cmn-04 small ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const btn_gray_medium = () => {
  return `<p class="btn-cmn-05"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_gray_medium_icon = () => {
  return `<p class="btn-cmn-05 ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const btn_gray_small = (text, link) => {
  return `<p class="btn-cmn-05 small"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

const btn_gray_small_icon = (text, link) => {
  return `<p class="btn-cmn-05 small ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}
// btn-grey-02-medium
const btn_gray_medium_02 = () => {
  return `<p class="btn-cmn-06"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

// btn-grey-02-medium with icon
const btn_gray_medium_icon_02 = () => {
  return `<p class="btn-cmn-06 ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

// btn-grey-02-small
const btn_gray_small_02 = (text, link) => {
  return `<p class="btn-cmn-06 small"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

// btn-grey-02-small with icon
const btn_gray_small_icon_02 = (text, link) => {
  return `<p class="btn-cmn-06 small ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

// btn-white-02-medium
const btn_white_medium_02 = (text, link)  => {
  return `<p class="btn-cmn-07"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

// btn-white-02-medium with icon
const btn_white_medium_icon_02 = (text, link)  => {
  return `<p class="btn-cmn-07 ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

// btn-white-02-small
const btn_white_small_02 = (text, link) => {
  return `<p class="btn-cmn-07 small"><a href="`+ link +`"><span>`+ text +`</span></a></p>`
}

// btn-white-02-small with icon
const btn_white_small_icon_02 = (text, link) => {
  return `<p class="btn-cmn-07 small ico-nw"><a href="`+ link +`" target="_blank"><span>`+ text +`</span></a></p>`
}

const box_image_3_col = (img) => {
  let template = '<div class="box-image-col container-fluid">\n<div class="row">\n'

  let arr = ''
  img.forEach(ele => {
    arr += '<div class="item col-sm-12 col-md-4"><figure class="img-cmn-01"><img src="' + ele.src + '" alt=""><figcaption>' + ele.fig + '</figcaption></figure></div>\n'
  });

  return template + arr +`</div>\n</div>`
}
const card_text_and_image_right = (src,alt,cap,txt)=>{
  return '<div claleft-detail"><div class="box-image"><figure class="image-detail"><img src="'+src+'" alt="'+alt+'"><figcaption class="image-caption">'+cap+'</figcaption></figure></div> <div class="box-text">'+txt+'</div></div>'
}

const card_text_and_image_left = (src,alt,cap,txt)=>{
  return '<div class="box-card-detail mod-image-left"><div class="box-image"><figure class="image-detail"><img src="'+src+'" alt="'+alt+'"><figcaption class="image-caption">'+cap+'</figcaption></figure></div> <div class="box-text">'+txt+'</div></div>'
}
module.exports = {
  box_title_1:box_title_1,
  text_tooltips:text_tooltips,
  links_02:links_02,
  card_text_and_image_right:card_text_and_image_right,
  card_text_and_image_left:card_text_and_image_left,
  text_cmn:text_cmn
}