// var sum = document.getElementById("jo");
// sum.innerHTML = moment().format();;

$(document).ready(function () {
    console.log("ready!");

    timeArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    dayplannerStorage = {};

    // $(".currentDay").text(moment(moment().format()).add(1, 'day').format('LLL'));
    $(".currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    console.log(moment().format("H"));

    createInputFields();
    loadDayplannerValues();

    $(".buttonRoundCorners").on("click", function () {
        var inputValue = $(this).parent().siblings("textarea").val();
        var locationValue = $(this).attr("id");

        dayplannerStorage = JSON.parse(localStorage.getItem("dayplannerItems"));
        dayplannerStorage[locationValue] = inputValue;
        localStorage.setItem("dayplannerItems", JSON.stringify(dayplannerStorage));
    });
    function loadDayplannerValues() {
        var storage = JSON.parse(localStorage.getItem("dayplannerItems"));
        for (var i = 0; i < timeArr.length; i++){
            var num = i + 9;
            if(storage.hasOwnProperty(num)){
                var idOfTextArea = "#" + num;
                $(idOfTextArea).val(storage[num])
            }
        }
    };


    function createInputFields() {
        for (var i = 0; i < timeArr.length; i++) {
            var numIndex = parseInt(i) + 9;

            var inputGroups = "<div class='input-group row'> \
        <div class='input-group-append border-top border-bottom col-sm-1 justify-content-center'> \
        <div class='text-center mt-3'> " + timeArr[i] + "</div> \
        </div> \
        <textarea class='form-control' aria-label='With textarea col-sm-8' id='" + numIndex + "' ></textarea> \
        <div class='input-group-append col-sm-1 pl-0'> \
        <button class='btn btn-info buttonRoundCorners btn-lg' id='" + numIndex + "' > \
        <i class='fas fa-save'></i> \
        </button> \
        </div> \
        </div>"

            $(".inputGroupsWrapper").append(inputGroups);
        }
    }

});