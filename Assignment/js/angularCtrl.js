var module = angular.module('myApp', []);

module.service('ContactService', function () {
    //to create unique contact id
    var uid = 100253;

    
    //contacts array to hold list of all contacts
    var contacts = [
        {
        id: "100250",
        "name": "Shiva Sankaran",
        "email": "shivamadhurai@gmail.com",
        "phone": "9885552332",
        "location": "velachary"
    },
    {
        id: "100251",
        "name": "Ganapathy raman",
        "email": "ganapathyraman@gmail.com",
        "phone": "9775552666",
        "location": "East Tambaram"
    },
   {
        id: "100252",
        "name": "Shri Vignesh",
        "email": "shrivignesh@gmail.com",
        "phone": "9995552998",
        "location": "Selayur"
    }
   ];
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }

    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.get = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                return contacts[i];
            }
        }

    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (id) {
        for (i in contacts) {
            if (contacts[i].id == id) {
                contacts.splice(i, 1);
            }
        }
    }

    //simply returns the contacts list
    this.list = function () {
        return contacts;
    }
});

module.controller('ContactController', function ($scope, ContactService, $timeout) {

    $scope.contacts = ContactService.list();

    $scope.detailBox =function(id){
        function setHover(selectedId){
            if ($scope.previousId!=undefined) {
                $("#" +$scope.previousId + " td:last-child div").html();
                $("#" +$scope.previousId).removeClass("selected");
            };

            $("#" + selectedId + " td:last-child div").html("<div class='hideBorder'><i class='fa fa-chevron-left'></i></div>");
            $("#" + selectedId).addClass("selected");
            $scope.previousId=selectedId;
        }
        if (id==0) {
            setHover($("#customerTable tr:first-child")[1].id);
        }
        else{
            setHover(id);
        }
    }
    $scope.validater = function(obj){
        if (obj.name !=undefined &&obj.email ==undefined && obj.phone !=undefined)
            {alert("Please enter your VALID email address");
            return false;}
        else if (obj.name !=undefined &&obj.email !=undefined && obj.phone !=undefined)
            return true;
        else
            return false;
    }

    $scope.saveContact = function () {
        if (!$scope.validater($scope.newcontact)) {
            return false;
        };
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
       $scope.close();
    }

    $scope.delete = function (id) {

        ContactService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }

    $scope.edit = function (id) {
        $scope.addNew();
        debugger;
        var result = angular.copy(ContactService.get(id));
        result.phone = Number(result.phone)
        $scope.newcontact = result;
    }

    $scope.addNew=function(){
         $(".bg-transparant").css("display","block");
        $(".dialog-box").css("display","block");
    }

    $scope.close=function(){
         $(".bg-transparant").css("display","none");
        $(".dialog-box").css("display","none");
    }

   $timeout(function () {
        $scope.detailBox(0);
    },100);
})