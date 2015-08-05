var module = angular.module('myApp', []);

module.service('rgDataTableService', function () {
    this.loadOptions=function(){
        $('.rg-dataTableOptions').dataTable();
    }
});
module.service('ContactService', function () {
    //to create unique contact id
    var uid = 1;
    
    //contacts array to hold list of all contacts
    var contacts = [{
        'id': 1,
        'name': 'Ragu',
            'email': 'lello@gmail.com',
            'phone': '123-2343-44'
    },
{
    'id':2 ,
        'name': 'Karthic',
            'email': 'qello@gmail.com',
            'phone': '123-2343-44'
    },
    {
       'id': 3,
        'name': 'Ambi',
            'email': 'hello@gmail.com',
            'phone': '123-2343-44'
    },
    {
      'id': 4,
        'name': 'Viral',
            'email': 'fello@gmail.com',
            'phone': '123-2343-44'
    },
    {
        'id':5,
        'name': 'Kanagavel',
            'email': 'aello@gmail.com',
            'phone': '123-2343-44'
    }];
    
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
        
        

    $scope.saveContact = function () {
        ContactService.save($scope.newcontact);
        $scope.newcontact = {};
        $scope.loadDatatable('.rg-dataTableOptions');
    }


    $scope.delete = function (id) {

        ContactService.delete(id);
        if ($scope.newcontact.id == id) 
            $scope.newcontact = {};

        /*setTimeout(function(){
            rgDataTableService.loadOptions();
        },1000);*/
    }


    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(ContactService.get(id));
    }

    $scope.loadDatatable = function (tableIds) {
    //$scope.showLoader($('#panelBody'));
    if ($scope.alreadyInitialized) {
        if ($scope.tempDatable != null) {
            $scope.tempDatable.fnDestroy();
            $scope.tempDatable = null;
            $(tableIds + ' tbody tr').remove();
        }
    }
    $timeout(function () {
        $scope.alreadyInitialized = true;
        $scope.tempDatable = $(tableIds).dataTable({
            'bFilter': false,
            "bLengthChange": false,
            "pagingType": "simple",
            "pageLength": 4,
            "columnDefs": [{ "orderable": false, "targets": 2 }, { "orderable": false, "targets": 3 }],
            'paging': true,  // Table pagination
            'ordering': true,  // Column ordering
            'order': [[0, 'asc']],
            "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 no-padding-left hidden-xs'l><'col-xs-12 col-sm-6 no-padding-right'f>r>" +
                      "t" +
                      "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 no-padding-left hidden-xs'i><'col-xs-12 col-sm-6 no-padding-right'p>>",
            oLanguage: {
                stateSave: 'Test',
            }
        });
        //$scope.hideLoader($('#panelBody'));
    }, 1);
}
$scope.loadDatatable('.rg-dataTableOptions');

});