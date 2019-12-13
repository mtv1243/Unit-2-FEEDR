/*
  Please add all Javascript code to this file.
*/
/*
*
*
*   POPUP CODE
*
*
*/
// let popUp = document.querySelector('#popUp');
// let closePopUp = document.querySelector('.closePopUp');
// let popUpImg = document.querySelector('.popUp-img');
// let popUpTitle = document.querySelector('.popUp-title');
// let popUpDescription = document.querySelector('.popUp-description');
// let popUpAction = document.querySelector('.popUpAction');

//main section
let body = document.querySelector('body');
let spacer = document.querySelector('.spacer');
let main = document.querySelector('#main');




let dateSelector = document.querySelector('.date-selector');


/*
*
*
*   DROPDOWN CODE
*   drives the article population
*
*
*/
//variables
let getBbcEl = document.querySelector('.getBbc');
let getBbcElInner = getBbcEl.innerHTML;
let getNytEl = document.querySelector('.getNyt');
let getNytElInner = getNytEl.innerHTML;
let getOmdbEl = document.querySelector('.getOmdb');
let getOmdbElInner = getOmdbEl.innerHTML;
let currentSource = document.querySelector('.currentSource');
console.log(getBbcElInner);

//fetch BBC data when click BBC dropdwn element
getBbcEl.addEventListener('click', (e)=>{
  e.preventDefault();
  dateSelector.classList.add('hidden');
  currentSource.innerHTML = getBbcElInner;
  getNytEl.classList.remove('active');
  getOmdbEl.classList.remove('active');
  getBbcEl.classList.add('active');
  getBbcFunc();
});

//fetch nyt data when click nyt dropdown element
getNytEl.addEventListener('click', (e)=>{
  e.preventDefault();
  dateSelector.classList.remove('hidden');
  currentSource.innerHTML = getNytElInner;
  getBbcEl.classList.remove('active');
  getOmdbEl.classList.remove('active');
  getNytEl.classList.add('active');
  getNytFunc();
});

//fetch OMDB data when click OMDB dropdown element
getOmdbEl.addEventListener('click', (e)=>{
  e.preventDefault();
  dateSelector.classList.add('hidden');
  getBbcEl.classList.remove('active');
  getNytEl.classList.remove('active');
  getOmdbEl.classList.add('active');
  console.log('clicked OMDB');
})
/*
 *
 *
 *    TOP HEADLINES CODE
 *
 *
 *
 */
//toggle the headline wrapper
let $topHeadlineTitle = $('.top-headlines-title-wrapper');
let $topHeadlineWrapper = $('.top-headline-wrapper');
let $header = $('header');

$topHeadlineTitle.click(()=>{
  $topHeadlineWrapper.slideToggle();
});
$header.mouseenter(()=>{
  $topHeadlineTitle.slideDown();
});
$header.mouseleave(()=>{
  $topHeadlineTitle.slideUp();
})

//top headline variables
let topHeadlineArticlesEl = document.querySelector('#top-headline-articles');
let loadingTopArticles = document.querySelector('.loading-top-articles');
let loading = document.querySelector('#loading');
let searchParams;

let key = 'd3f1b410f43c4e519bda526f1ace84e0';
let topHeadlineUrl = 'https://newsapi.org/v2/';

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
*    BBC Code
*
*
*
*
*
*
*/

function getBbcFunc(){

  let mainArticleContainer = document.querySelector('#main');
  let baseUrl = 'https://newsapi.org/v2/';
  let domain = 'bbc.co.uk';

fetch('https://newsapi.org/v2/everything?domains=' + domain + '&apiKey=' + key)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
//     console.log(response);
//reset #main
main.innerHTML = '';
for (let i = 0; i < 4; i++) {
    //store data from the response
    let imgUrl = response.articles[i].urlToImage;
    let articleUrl = response.articles[i].url;
    let title = response.articles[i].title;
    let author = response.articles[i].author;
    let source = response.articles[i].source.name;
    let description = response.articles[i].description;
    let content = response.articles[i].content;

    //create popUp elements to populate on load
    let popUp = document.createElement('div');
    popUp.setAttribute('id', 'popUp');
    popUp.setAttribute('class', 'hidden');
    popUp.classList.add('popUp' + i);
    let closePopUp = document.createElement('a');
    closePopUp.setAttribute('class', 'closePopUp');
    closePopUp.setAttribute('href', '#');
    closePopUp.innerHTML = 'X';
    let popUpContainer = document.createElement('div');
    popUpContainer.setAttribute('class', 'container');
    let popUpImg = document.createElement('img');
    popUpImg.setAttribute('class', 'popUp-img');
    let popUpTitle = document.createElement('h1');
    popUpTitle.setAttribute('class', 'popUp-title');
    let popUpDescription = document.createElement('p');
    popUpDescription.setAttribute('class', 'popUp-description');
    let popUpAction = document.createElement('a');
    popUpAction.setAttribute('href', '#');
    popUpAction.setAttribute('class', 'popUpAction');
    popUpAction.setAttribute('target', '_blank');
    popUpAction.innerHTML = 'Read more from the source';

    //populate the popUp
    popUpImg.setAttribute('src', imgUrl);
    popUpTitle.innerHTML = title;
    popUpDescription.innerHTML = description;
    popUpAction.setAttribute('href', articleUrl);
    //assemble the popUp
    popUpContainer.append(popUpImg);
    popUpContainer.append(popUpTitle);
    popUpContainer.append(popUpDescription);
    popUpContainer.append(popUpAction);
    popUp.append(closePopUp);
    popUp.append(popUpContainer);
    //insert the popUp
    body.insertBefore(popUp, spacer);

    main.onclick = (event)=>{
      let target = event.target;
      if(target.tagName !== 'article') {
        popUp.classList.remove('hidden');
      } else {
        return;
      }
    }
    closePopUp.onclick = ()=>{
      popUp.classList.add('hidden');
    }

    //create article elements to populate on load
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
    articleEl.classList.add('article', 'article' + i);
    sectionFeaturedImgEl.classList.add('featuredImage');
    sectionArticleContentEl.classList.add('articleContent');
    h3titleEl.classList.add('title');
    clearfixEl.classList.add('clearfix');
    imgEl.setAttribute('src', imgUrl);
    anchorEl.setAttribute('href', '#');
    sectionImpressionsEl.innerHTML = 'Click for more';

    //populate the elements
    h3titleEl.innerHTML = title;
    h6SourceEl.innerHTML = source;

    //populate the elements with the response content
    //order matters, work from the inside out
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
    // close for loop
  }
//close final .then()
  });
//close function
}
//populate the articleswith BBC content to begin
getBbcFunc();
/*
*
*
*
*
*
*    NYT Code
*
*
*
*
*
*
*/

//Date selector code
let yearInput = document.querySelector('.year-input');
let monthInput = document.querySelector('.month-input');
let dayInput = document.querySelector('.day-input');
let dateButton = document.querySelector('.date-button');
let year = yearInput.value;
let month = monthInput.value;

dateButton.addEventListener('click', (e)=>{
  e.preventDefault();
  main.innerHTML = '';
  main.classList.add('loader');
  year = yearInput.value;
  month = monthInput.value;
  getNytFunc();
  console.log(month);
})

function getNytFunc(){
let mainArticleContainer = document.querySelector('#main');
let nytKey = '031670YfuZ8ia2FOGsqBOjYlLP8FsOeB';
//!!!IMPORTANT!!! single digit months in this URL do NOT need a zero in front
//meaning (1 = january) is valid. (01 = january) is invalid.
let nytUrl = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=' + nytKey;
//On this day fetch
fetch(nytUrl)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
    main.innerHTML = '';
    main.classList.remove('loader');
    //
    console.log(response);
    //
    //iterate through response to populate #main
    for(m = 0; m<4; m++){
      //
      //store data from the response
      let imgUrl = 'https://res.cloudinary.com/mtv1243/image/upload/v1576190267/new_york_times_t_black_background.jpg';
      //store data from the response
      let nytArticle = response.response.docs[m];
      let nytPubDate = nytArticle.pub_date;
      let articleUrl = nytArticle.web_url;
      let title = nytArticle.headline.main;
      let wordCount = nytArticle.word_count;
      let source = nytArticle.source;
      let description = nytArticle.lead_paragraph;
      //
      //create the elements
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
      //
      //add the necessary classes and attributes to the elements
      articleEl.classList.add('article');
      sectionFeaturedImgEl.classList.add('featuredImage');
      sectionArticleContentEl.classList.add('articleContent');
      h3titleEl.classList.add('title');
      clearfixEl.classList.add('clearfix');
      imgEl.setAttribute('src', imgUrl);
      anchorEl.setAttribute('href', '#');
      sectionImpressionsEl.innerHTML = 'Click for more';
      //
      //insert elements into #main
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
    //close for loop
    }
    //date variables
    //1890-03-01T00:00:00Z = example required date format
    // function pad(n){return n<10 ? '0'+n : n}
    // let padMonth = pad(month);
    // let yearMonth = year + '-' + padMonth;
    // console.log('yearMonth = ' + yearMonth);
    //
    // //array where we will store the articles with the correct pub date
    // let nytArticlesArr = [];
    // //fills the array with the correct articles. declared below
    // findTodayArticles();
    //
    // //declare the function to populate nytArticlesArr
    // function findTodayArticles() {
    //   console.log('starting search');
    //   for(let k = 0; k<response.response.docs.length; k++){
    //     nytArticle = response.response.docs[k];
    //     nytPubDate = nytArticle.pub_date;
    //     //search each article's pubdate for dayMonth
    //     if(nytPubDate.search(yearMonth) === 0) {
    //       nytArticlesArr.push(nytArticle);
    //     }
    //  //close for loop
    //   }
    //   return nytArticlesArr;
    // //close findTodayArticles
    // };
    //close final .then
  })
// close getNytFunc function
}
