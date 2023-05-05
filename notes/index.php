<?php

session_start();
if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > 900) {
  // last request was more than 15 minutes ago
  session_unset(); // unset $_SESSION variable for the run-time
  session_destroy(); // destroy session data in storage
  header("Location: ../login/index.php"); // redirect to login page
}
$_SESSION['last_activity'] = time(); // update last activity time stamp

if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {

$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");
$rs = pg_query("SELECT * FROM note where uid = ".$_SESSION['userid']);

 ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <!--  This file has been downloaded from bootdey.com @bootdey on twitter -->
    <!--  All snippets are MIT license http://bootdey.com/license -->
    <title>Notes dashboard </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel = "stylesheet" href = 'notes_styles.css'>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="notes_script.js"></script>
</head>
<body>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
<div class="page-content container note-has-grid">
    <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
        <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active" id="all-category">
                <i class="icon-layers mr-1"></i><span class="d-none d-md-block">All Notes</span>
            </a>
        </li>
        
        <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-important"> <i class="icon-tag mr-1"></i><span class="d-none d-md-block">Important</span></a>
        </li>
        <li class="nav-item">
            <a href="/" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2"><span class="d-none d-md-block">Back to Overview</span></a>
        </li>
        <li class="nav-item ml-auto">
            <a href="javascript:void(0)" class="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-notes"> <i class="icon-note m-0"></i><h5><span class="d-none d-md-block font-14"> + </span></h5></a>
        </li>
        &nbsp;&nbsp;&nbsp;

    </ul>
    <div class="tab-content bg-transparent">
        <div id="note-full-container" class="note-has-grid row">
        <?php if(pg_num_rows($rs) > 0){
			while($out = pg_fetch_array($rs)) {    
				echo "<div class='col-md-4 single-note-item all-category note-important'>";
					echo "<div class='card card-body'>";
						echo "<span class='side-stick'></span>";
						echo "<h5 class='note-title text-truncate w-75 mb-0' data-noteheading='Go for lunch'>".$out['name']."<i class='point fa fa-circle ml-1 font-10'></i></h5>";
                   // <p class="note-date font-12 text-muted">19 November 2021</p>
						echo "<div class='note-content'>".$out['description'];
						echo "</div>";
                    echo "<div class='d-flex align-items-center'>";
                        echo "<span class='mr-1'><i class='fa fa-star favourite-note'></i></span>";
                        echo "<span class='mr-1'><i class='fa fa-trash remove-note'></i></span>";
                        echo "<div class='ml-auto'>";
                            echo "<div class='category-selector btn-group'>";
                                echo "<a class='nav-link dropdown-toggle category-dropdown label-group p-0' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='true'>";
                                    echo "<div class='category'>";
                                        echo "<div class='category-important'></div>";
                                        echo "<span class='more-options text-dark'><i class='icon-options-vertical'></i></span>";
                                    echo "</div>";
                                echo "</a>";
                                echo "<div class='dropdown-menu dropdown-menu-right category-menu'>";
                                    
                                    echo "<a class='note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger' href='javascript:void(0);'>";
                                        echo "<i class='mdi mdi-checkbox-blank-circle-outline mr-1'></i> Important";
                                    echo "</a>";
                                echo "</div>";
                            echo "</div>";
                        echo "</div>";
                    echo "</div>";
                echo "</div>";
            echo "</div>";
			}
		}
?>


    <!-- Modal Add notes -->
    <div class="modal fade" id="addnotesmodal" tabindex="-1" role="dialog" aria-labelledby="addnotesmodalTitle" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title text-white">Add Notes</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
		<form action="addnote.php" id="addnotesmodalTitle" method="GET">
                <div class="modal-body">
                    <div class="notes-box">
                        <div class="notes-content">

                                <div class="row">
                                    <div class="col-md-12 mb-3">
                                        <div class="note-title">
                                            <label>Note Title</label>
                                            <input type="text" id="note-has-title" name="title" class="form-control" maxlength="50" placeholder="Title" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="note-description">
                                            <label>Note Description</label>
                                            <textarea id="note-has-description" name="description" class="form-control" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-n-save" class="float-left btn btn-success" style="display: none;">Save</button>
                    <button class="btn btn-danger" data-dismiss="modal">Discard</button>
                    <input type="submit" name="add" value="Add" />
                </div>
		</form>
            </div>
        </div>
    </div>
</div>
<style type="text/css">

body{
    background: #edf1f5;
    margin-top:20px;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: 0;
}
.card {
    margin-bottom: 30px;
}
.card-body {
    flex: 1 1 auto;
    padding: 1.57rem;
}

 .note-has-grid .nav-link {
     padding: .5rem
 }

 .note-has-grid .single-note-item .card {
     border-radius: 10px
 }

 .note-has-grid .single-note-item .favourite-note {
     cursor: pointer
 }

 .note-has-grid .single-note-item .side-stick {
     position: absolute;
     width: 3px;
     height: 35px;
     left: 0;
     background-color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item .category-dropdown.dropdown-toggle:after {
     display: none
 }

 .note-has-grid .single-note-item .category [class*=category-] {
     height: 15px;
     width: 15px;
     display: none
 }

 .note-has-grid .single-note-item .category [class*=category-]::after {
     content: "\f0d7";
     font: normal normal normal 14px/1 FontAwesome;
     font-size: 12px;
     color: #fff;
     position: absolute
 }

 .note-has-grid .single-note-item .category .category-business {
     background-color: rgba(2, 4, 110, 0.571);
     border: 2px solid rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item .category .category-social {
     background-color: rgba(2, 4, 110, 0.571);
     border: 2px solid rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item .category .category-important {
     background-color: rgba(2, 4, 110, 0.571);
     border: 2px solid rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.all-category .point {
     color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.note-business .point {
     color: rgba(2, 4, 110, 0.571); /* Most common color code */
 }

 .note-has-grid .single-note-item.note-business .side-stick {
     background-color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.note-business .category .category-business {
     display: inline-block
 }

 .note-has-grid .single-note-item.note-favourite .favourite-note {
     color: #ffc107;
 }

 .note-has-grid .single-note-item.note-social .point {
     color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.note-social .side-stick {
     background-color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.note-social .category .category-social {
     display: inline-block
 }

 .note-has-grid .single-note-item.note-important .point {
     color: rgba(255, 80, 80, .5);
 }

 .note-has-grid .single-note-item.note-important .side-stick {
     background-color: rgba(2, 4, 110, 0.571);
 }

 .note-has-grid .single-note-item.note-important .category .category-important {
     display: inline-block
 }

 .note-has-grid .single-note-item.all-category .more-options,
 .note-has-grid .single-note-item.all-category.note-favourite .more-options {
     display: block
 }

 .note-has-grid .single-note-item.all-category.note-business .more-options,
 .note-has-grid .single-note-item.all-category.note-favourite.note-business .more-options,
 .note-has-grid .single-note-item.all-category.note-favourite.note-important .more-options,
 .note-has-grid .single-note-item.all-category.note-favourite.note-social .more-options,
 .note-has-grid .single-note-item.all-category.note-important .more-options,
 .note-has-grid .single-note-item.all-category.note-social .more-options {
     display: none
 }

 @media (max-width:767.98px) {
     .note-has-grid .single-note-item {
         max-width: 100%
     }
 }

 @media (max-width:991.98px) {
     .note-has-grid .single-note-item {
         max-width: 216px
     }
 }


</style>

<script type="text/javascript">
$(function() {
    function removeNote() {
        $(".remove-note").off('click').on('click', function(event) {
          event.stopPropagation();
          $(this).parents('.single-note-item').remove();
        })
    }

    function favouriteNote() {
        $(".favourite-note").off('click').on('click', function(event) {
          event.stopPropagation();
          $(this).parents('.single-note-item').toggleClass('note-favourite');
        })
    }

    function addLabelGroups() {
        $('.category-selector .badge-group-item').off('click').on('click', function(event) {
          event.preventDefault();
          /* Act on the event */
          var getclass = this.className;
          var getSplitclass = getclass.split(' ')[0];
          if ($(this).hasClass('badge-business')) {
            $(this).parents('.single-note-item').removeClass('note-social');
            $(this).parents('.single-note-item').removeClass('note-important');
            $(this).parents('.single-note-item').toggleClass(getSplitclass);
          } else if ($(this).hasClass('badge-social')) {
            $(this).parents('.single-note-item').removeClass('note-business');
            $(this).parents('.single-note-item').removeClass('note-important');
            $(this).parents('.single-note-item').toggleClass(getSplitclass);
          } else if ($(this).hasClass('badge-important')) {
            $(this).parents('.single-note-item').removeClass('note-social');
            $(this).parents('.single-note-item').removeClass('note-business');
            $(this).parents('.single-note-item').toggleClass(getSplitclass);
          }
        });
    }

    var $btns = $('.note-link').click(function() {
        if (this.id == 'all-category') {
          var $el = $('.' + this.id).fadeIn();
          $('#note-full-container > div').not($el).hide();
        } if (this.id == 'important') {
          var $el = $('.' + this.id).fadeIn();
          $('#note-full-container > div').not($el).hide();
        } else {
          var $el = $('.' + this.id).fadeIn();
          $('#note-full-container > div').not($el).hide();
        }
        $btns.removeClass('active');
        $(this).addClass('active');  
    })

    $('#add-notes').on('click', function(event) {
        $('#addnotesmodal').modal('show');
        $('#btn-n-save').hide();
        $('#btn-n-add').show();
    })

    // Button add
    $("#btn-n-add").on('click', function(event) {
        event.preventDefault();
    /* Act on the event - This is nulled out as event adding will be done via db. */
      /*  var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth()); //January is 0!
      var yyyy = today.getFullYear();
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      today = dd + ' ' + monthNames[mm]  + ' ' + yyyy;

        var $_noteTitle = document.getElementById('note-has-title').value;
        var $_noteDescription = document.getElementById('note-has-description').value;

        $html =     '<div class="col-md-4 single-note-item all-category"><div class="card card-body">' +
                                '<span class="side-stick"></span>' +
                                '<h5 class="note-title text-truncate w-75 mb-0" data-noteHeading="'+$_noteTitle+'">'+$_noteTitle+'<i class="point fa fa-circle ml-1 font-10"></i></h5>' +
                                '<p class="note-date font-12 text-muted">'+today+'</p>' +
                                '<div class="note-content">' +
                                    '<p class="note-inner-content text-muted" data-noteContent="'+$_noteDescription+'">'+$_noteDescription+'</p>' +
                                '</div>' +
                                '<div class="d-flex align-items-center">' +
                                    '<span class="mr-1"><i class="fa fa-star favourite-note"></i></span>' +
                                    '<span class="mr-1"><i class="fa fa-trash remove-note"></i></span>' +
                                    '<div class="ml-auto">' +
                                          '<div class="category-selector btn-group">' +
                                                    '<a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">' +
                                                        '<div class="category">' +
                                                            '<div class="category-business"></div>' +
                                                            '<div class="category-social"></div>' +
                                                            '<div class="category-important"></div>' +
                                                            '<span class="more-options text-dark"><i class="icon-options-vertical"></i></span>'+
                                                        '</div>' +
                                                    '</a>' +
                                                    '<div class="dropdown-menu dropdown-menu-right category-menu">' +
                                                        '<a class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Business</a>' +
                                                        '<a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Social</a>' +
                                                        '<a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" href="javascript:void(0);"><i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Important</a>' +
                                                '</div>' +
                                         '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div></div> ';
		*/
        $("#note-full-container").prepend($html);
        $('#addnotesmodal').modal('hide');

        removeNote();
        favouriteNote();
        addLabelGroups();
    });

    $('#addnotesmodal').on('hidden.bs.modal', function (event) {
        event.preventDefault();
        document.getElementById('note-has-title').value = '';
        document.getElementById('note-has-description').value = '';
    })

    removeNote();
    favouriteNote();
    addLabelGroups();

    $('#btn-n-add').attr('disabled', 'disabled'); 
})

 $('#note-has-title').keyup(function() {
      var empty = false;
      $('#note-has-title').each(function() {
          if ($(this).val() == '') {
                  empty = true;
          }
      });

      if (empty) {
          $('#btn-n-add').attr('disabled', 'disabled'); 
      } else {
          $('#btn-n-add').removeAttr('disabled');
      }
}); 

</script>
</body>
</html>
<?php } ?>
