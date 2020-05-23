function genModal(triggerId, modalId, title, abstract, imgUrl) {
    return `
<div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="text-center"><img src="${imgUrl}" width="88%" /></div>
        <strong>Abstract</strong>: ${abstract}
      </div>
    </div>
  </div>
</div>
`;
}


function addPaperItem(
    paperId, title, firstAuthors, otherAuthors, publisher, abstract="", imgUrl="", paperUrl="", codeUrl="", posterUrl="", slidesUrl="", blogUrl=""
) {
    let titleLine = `
<button type="button" class="btn btn-link text-left" id="modalTrigger_${paperId}" style="padding-left: 0" data-toggle="modal"
    data-target="#modal_${paperId}"><strong>${title}</strong></button><br/>
`;
    let modal = genModal(`modalTrigger_${paperId}`, `modal_${paperId}`, title, abstract, imgUrl);
    let shareFirstAuthorship = (firstAuthors.length > 1);
    let firstAuthorSuffix = shareFirstAuthorship ? "*" : "";
    let renderedAuthors = firstAuthors.map(
        name => name === "Me" ? `<u>Changhan Wang${firstAuthorSuffix}</u>` : `${name}${firstAuthorSuffix}`
    );
    renderedAuthors = renderedAuthors.concat(otherAuthors.map(name => name === "Me" ? "<u>Changhan Wang</u>" : name));
    let authorLine = renderedAuthors.join(", ") + (shareFirstAuthorship ? " (* equal contribution)" : "") +  "<br/>";

    let publisherLine = `<i>${publisher}</i><br/>`;
    let paperBtn = "";
    if (paperUrl.length > 0) {
        let icon = $("<i></i>").addClass("far").addClass("fa-file-pdf");
        paperBtn = $("<button></button>").addClass("btn").addClass("btn-sm").addClass("btn-primary")
            .click(function () {window.open(paperUrl)}).append(icon).append(" Paper");
    }
    let codeBtn = "";
    if (codeUrl.length > 0) {
        let icon = $("<i></i>").addClass("fab").addClass("fa-github");
        codeBtn = $("<button></button>").addClass("btn").addClass("btn-sm").addClass("btn-success")
            .click(function () {window.open(codeUrl)}).append(icon).append(" Code").css({"margin-left": "1%"});
    }
    let posterBtn = "";
    if (posterUrl.length > 0) {
        let icon = $("<i></i>").addClass("fas").addClass("fa-file-powerpoint");
        posterBtn = $("<button></button>").addClass("btn").addClass("btn-sm").addClass("btn-info")
            .click(function () {window.open(posterUrl)}).append(icon).append(" Poster").css({"margin-left": "1%"});
    }
    let slidesBtn = "";
    if (slidesUrl.length > 0) {
        let icon = $("<i></i>").addClass("fas").addClass("fa-file-powerpoint");
        slidesBtn = $("<button></button>").addClass("btn").addClass("btn-sm").addClass("btn-info")
            .click(function () {window.open(slidesUrl)}).append(icon).append(" Slides").css({"margin-left": "1%"});
    }
    let blogBtn = "";
    if (blogUrl.length > 0) {
        let icon = $("<i></i>").addClass("fas").addClass("fa-file-alt");
        blogBtn = $("<button></button>").addClass("btn").addClass("btn-sm").addClass("btn-secondary")
            .click(function () {window.open(blogUrl)}).append(icon).append(" Blog").css({"margin-left": "1%"});
    }
    let item = $("<li></li>").append(titleLine).append(modal).append(authorLine).append(publisherLine)
        .append(paperBtn).append(codeBtn).append(posterBtn).append(slidesBtn).append(blogBtn);
    $("#publicationList").append(item);
}
