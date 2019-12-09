/*
  Please add all Javascript code to this file.
*/

//TOP HEADLINES CODE
//toggle the headline wrapper
let $topHeadlineTitle = $('.top-headlines-title-wrapper');
let $topHeadlineWrapper = $('.top-headline-wrapper');
let $header = $('header');

$topHeadlineTitle.click(()=>{
  console.log('click')
  $topHeadlineWrapper.slideToggle();
});

$header.mouseenter(()=>{
  $topHeadlineTitle.slideDown();
});

$header.mouseleave(()=>{
  $topHeadlineTitle.slideUp();
})

let key = 'd3f1b410f43c4e519bda526f1ace84e0';
let topHeadlineUrl = 'https://newsapi.org/v2/';

let loadingTopArticles = document.querySelector('.loading-top-articles');
let loading = document.querySelector('#loading');
let searchParams;

//top headline variable
let topHeadlineArticlesEl = document.querySelector('#top-headline-articles');

//GENERATE CURRENT TOP HEADLINES ON PAGE LOAD
fetch(topHeadlineUrl + 'top-headlines?pageSize=100&country=us&apiKey=' + key)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
    loadingTopArticles.classList.add('hide');
    // console.log(response);
    //iterate through the response articles and append them to #top-headline-articles
    for(let i = 0; i < response.articles.length; i++){
      //get content from the response
      let imgUrl = response.articles[i].urlToImage;
      let articleUrl = response.articles[i].url;
      let title = response.articles[i].title;
      let author = response.articles[i].author;
      let source = response.articles[i].source.name;
      let description = response.articles[i].description;
      let content = response.articles[i].content;

      //create article element that will be populated
      let articleEl = document.createElement('article');

      //create elements to populate on load
      let anchorEl = document.createElement('a');
      anchorEl.setAttribute('href', articleUrl);
      anchorEl.setAttribute('target', '_blank');
      anchorEl.setAttribute('class', 'top-headline-anchor')
      let imgEl = document.createElement('img');
      imgEl.classList.add('img');
      let titleEl = document.createElement('h4');
      titleEl.classList.add('title');
      let sourceEl = document.createElement('span');
      sourceEl.classList.add('source');
    //uncomment if you want to add more information to top headlines element
    //but don't forget the other variables!
      // let byEl = document.createElement('span');
      // byEl.classList.add('by');
      // let authorEl = document.createElement('span');
      // authorEl.classList.add('author');
      // let atEl = document.createElement('span');
      // atEl.classList.add('at');
      // let descriptionEl = document.createElement('p');
      // descriptionEl.classList.add('description');
      // let contentEl = document.createElement('p');
      // contentEl.classList.add('conent');

      //restrict length of the article title
      title = title.substring(0,34) + '...';

      //add the response content to the elements
      imgEl.setAttribute('src', imgUrl);
      titleEl.innerHTML = title;
      sourceEl.innerHTML = source;
    //uncomment if you want to add more information to top headlines element
    //but don't forget the other variables!
      // byEl.innerHTML = 'by ';
      // authorEl.innerHTML = author;
      // atEl.innerHTML = ' at ';
      // descriptionEl.innerHTML = description;
      // contentEl.innerHTML = content;

    //put the elements in an array, can be as long as you want
    //they'll be inserted into the page in their index order
      let elementsArr = [
        sourceEl,
        imgEl,
        titleEl
      ];

      //append article element to #top-headline-articles
      topHeadlineArticlesEl.append(anchorEl);
      anchorEl.append(articleEl)

      //insert the elements into the article element by array index
      for(j = 0; j < elementsArr.length; j++){
        articleEl.append(elementsArr[j]);
      }
//close if
    }
//close .then
  });
/*
*
*
*
*
*
*
*
*
*
*
*/

let mainArticleContainer = document.querySelector('#main');
let baseUrl = 'https://newsapi.org/v2/';
let domain = 'bbc.co.uk';

fetch('https://newsapi.org/v2/everything?domains=' + domain + '&apiKey=' + key)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
    console.log(response);

for (let i = 0; i < 4; i++) {
    //store data from the response
    let imgUrl = response.articles[i].urlToImage;
    let articleUrl = response.articles[i].url;
    let title = response.articles[i].title;
    let author = response.articles[i].author;
    let source = response.articles[i].source.name;
    let description = response.articles[i].description;
    let content = response.articles[i].content;

    //create elements to populate on load
    let articleEl = document.createElement('article');
    let sectionFeaturedImgEl = document.createElement('section');
    let imgEl = document.createElement('img');
    let sectionArticleContentEl = document.createElement('section');
    let anchorEl = document.createElement('a');
    let h3titleEl = document.createElement('h3');
    let h6SourceEl = document.createElement('h6');
    let sectionImpressionsEl = document.createElement('section');
    let clearfixEl = document.createElement('div');
    // anchorEl.setAttribute('target', '_blank');
    // anchorEl.setAttribute('class', 'top-headline-anchor')

    //add the necessary classes and attributes
    articleEl.classList.add('article');
    sectionFeaturedImgEl.classList.add('featuredImage');
    sectionArticleContentEl.classList.add('articleContent');
    h3titleEl.classList.add('title');
    clearfixEl.classList.add('clearfix');
    imgEl.setAttribute('src', imgUrl);
    anchorEl.setAttribute('href', '#');
    sectionImpressionsEl.innerHTML = '526';

    //populate the elements
    h3titleEl.innerHTML = title;
    h6SourceEl.innerHTML = source;

    //populate the elements with the response content
    anchorEl.append(h3titleEl);
    sectionArticleContentEl.append(anchorEl);
    sectionArticleContentEl.append(h6SourceEl);
    sectionFeaturedImgEl.append(imgEl);
    articleEl.append(sectionFeaturedImgEl);
    articleEl.append(sectionArticleContentEl);
    articleEl.append(sectionImpressionsEl);
    articleEl.append(clearfixEl);
    //insert the populated article element into #main
    mainArticleContainer.append(articleEl);
}
// close for loop
  });
//close final .then()

//get today's date
function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad((d.getUTCMonth() - 2)+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
};
let today = new Date();
let todayRFC = ISODateString(today);
console.log(todayRFC);

//On this day fetch
let url = 'https://api.currentsapi.services/v1/search?' + 'language=en&' + 'end_date=' + todayRFC + '&' + 'apiKey=w8hrxg7aiMbGuqeuAYWmeWQKrjWds3vqjf1NbruAo73ZUgFh';
// let url = 'https://api.currentsapi.services/v1/available/regions';

fetch(url)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
    console.log(response);
  })
