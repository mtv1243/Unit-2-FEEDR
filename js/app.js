/*
*
*
*   POPUP CODE
*
*
*/

//reload on logo click
let feedrLogo = document.querySelector('.feedrLogo');
feedrLogo.addEventListener('click', (e)=>{
  e.preventDefault();
  window.location.reload(false);
})

//main section
let body = document.querySelector('body');
let spacer = document.querySelector('.spacer');
let main = document.querySelector('#main');
let popUpSection = document.querySelector('.popUpSection');

body.addEventListener('click', (event)=>{
  console.log(event);
  let target = event.target;
  //find closest article el ancestor to target
  let articleClicked = target.closest('article');
  let closePopUp = document.querySelector('.closePopUp');
  let closePopUpClicked;
  let popUpsAll = document.getElementsByClassName('popUp');
  console.log(popUpsAll[0].classList);
  //get the target's classes as a string
  let targetClassName = target.className;
  //if clicked in article, show popUp, if clicked X, hide it
  if(targetClassName.includes('closePopUp')){
    popUpsAll[0].classList.add('hidden');
    popUpsAll[1].classList.add('hidden');
    popUpsAll[2].classList.add('hidden');
    popUpsAll[3].classList.add('hidden');
  } else{
      if(articleClicked.className.includes('article0')) {
      popUpsAll[0].classList.remove('hidden');
    } else if(articleClicked.className.includes('article1')) {
      popUpsAll[1].classList.remove('hidden');
    } else if(articleClicked.className.includes('article2')) {
      popUpsAll[2].classList.remove('hidden');
    } else if(articleClicked.className.includes('article3')) {
      popUpsAll[3].classList.remove('hidden');
    }
  }
});

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
let currentSource = document.querySelector('.currentSource');

//fetch BBC data when click BBC dropdwn element
getBbcEl.addEventListener('click', (e)=>{
  e.preventDefault();
  dateSelector.classList.add('hidden');
  currentSource.innerHTML = getBbcElInner;
  getNytEl.classList.remove('active');
  getBbcEl.classList.add('active');
  getBbcFunc();
});

//fetch nyt data when click nyt dropdown element
getNytEl.addEventListener('click', (e)=>{
  e.preventDefault();
  dateSelector.classList.remove('hidden');
  currentSource.innerHTML = getNytElInner;
  getBbcEl.classList.remove('active');
  getNytEl.classList.add('active');
  getNytFunc();
});

/*
 *
 *
 *    TOP HEADLINES CODE
 *
 *
 *
 */
//toggle the headline wrapper up and down
let $topHeadlineTitle = $('.top-headlines-title-wrapper');
let $topHeadlineWrapper = $('.top-headline-wrapper');
let $header = $('header');

$topHeadlineTitle.click(()=>{
  $topHeadlineWrapper.slideToggle();
});
$header.mouseenter(()=>{
  $topHeadlineTitle.slideDown(200);
});
$header.mouseleave(()=>{
  $topHeadlineTitle.slideUp(200);
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
let mainArticleContainer = document.querySelector('#main');
function getBbcFunc(){

  let baseUrl = 'https://newsapi.org/v2/';
  let domain = 'bbc.co.uk';
  main.classList.add('loader');
  main.innerHTML = '';
  popUpSection.innerHTML = '';

fetch('https://newsapi.org/v2/everything?domains=' + domain + '&apiKey=' + key)
  .then((res)=>{
    return res.json();
  })
  .then((response)=>{
  if(response.articles.length === 0) {
    alert('There ar no articles to showright now! Please refresh the page and try again.');
  }
  //reset #main
  main.classList.remove('loader');

for (let i = 0; i < 4; i++) {
    //store data from the response
    let imgUrl = response.articles[i].urlToImage;
    let articleUrl = response.articles[i].url;
    let title = response.articles[i].title;
    let author = response.articles[i].author;
    let source = response.articles[i].source.name;
    let description = response.articles[i].description;
    let content = response.articles[i].content;

  //call create popup function
  createPopUp(imgUrl, title, description, articleUrl, i);
  //call create article function
  createArticle(imgUrl, title, source, i);
  // close for loop
  }
//close final .then()
  });
//close function
}
//populate the articles with BBC content on page load
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
  popUpSection.innerHTML = '';
  main.innerHTML = '';
  year = yearInput.value;
  month = monthInput.value;
  getNytFunc();
  console.log(month);
})

function getNytFunc(){
  let nytKey = '031670YfuZ8ia2FOGsqBOjYlLP8FsOeB';
  //!!!IMPORTANT!!! single digit months in this URL do NOT need a zero in front
  //meaning (1 = january) is valid. (01 = january) is invalid.
  let nytUrl = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=' + nytKey;

  main.classList.add('loader');
  main.innerHTML = '';
  popUpSection.innerHTML = '';
  //On this day NYT fetch
  fetch(nytUrl)
    .then((res)=>{
      return res.json();
    })
    .then((response)=>{
      main.classList.remove('loader');
      if(response.response.docs.length === 0) {
        alert('There ar no articles to show for that selection!');
      }
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
        //call create popup function
        createPopUp(imgUrl, title, description, articleUrl, m);
        //call create article function
        createArticle(imgUrl, title, source, m);
      //close for loop
      }
      //close final .then
    })
// close getNytFunc function
}

/*
*
*
*
*   Function Declarations
*
*
*
*
*/

//create popup function declaration
function createPopUp(popUpPicUrl, popUpHeadline, popUpDescr, popUpUrl, popUpArtIndex){
    //create popUp elements to populate on load
    let popUp = document.createElement('div');
    popUp.setAttribute('id', 'popUp');
    popUp.setAttribute('class', 'hidden');
    popUp.classList.add('popUp', 'popUp' + popUpArtIndex);
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
    popUpImg.setAttribute('src', popUpPicUrl);
    popUpTitle.innerHTML = popUpHeadline;
    popUpDescription.innerHTML = popUpDescr;
    popUpAction.setAttribute('href', popUpUrl);
    //assemble the popUp
    popUpContainer.append(popUpImg);
    popUpContainer.append(popUpTitle);
    popUpContainer.append(popUpDescription);
    popUpContainer.append(popUpAction);
    popUp.append(closePopUp);
    popUp.append(popUpContainer);
    //insert the popUp before the spacer element
    popUpSection.append(popUp);
  //close createPopUp
  }

//createArticle function declaration
function createArticle(artPicUrl, artTitle, artSource, artIndex){

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

      //add the necessary classes and attributes
      articleEl.classList.add('article', 'article' + artIndex);
      sectionFeaturedImgEl.classList.add('featuredImage');
      sectionArticleContentEl.classList.add('articleContent');
      h3titleEl.classList.add('title');
      clearfixEl.classList.add('clearfix');
      imgEl.setAttribute('src', artPicUrl);
      anchorEl.setAttribute('href', '#');
      sectionImpressionsEl.innerHTML = 'Click for more';
      sectionImpressionsEl.classList.add('clickForMore')

      //populate the elements
      h3titleEl.innerHTML = artTitle;
      h6SourceEl.innerHTML = artSource;

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
  //close createArticle function
  }
