(function() {
    'use strict';
    webapp.controller('HomeController', [
        '$scope',
        '$rootScope',
        '$log',
        '$timeout',
        '$location',
        '$q',
        '$http',
        '$window',
        '$routeParams',
        'UtilService',
        'ngProgressBarService',
        function($scope, $rootScope, $log, $timeout, $location, $q,$http,
            $window,$routeParams,UtilService,ngProgressBarService) {

            $scope.queryData={
                q:"",
                maxTotalTimeInSeconds:null,
            };
          
           $scope.ingredient = {
                item1 : null,
                search1 : null,
                item2 : null,
                search2 : null,
                allowedIngredient: [],
                excludedIngredient:[],

                list : UtilService.ingredient,

            };
            $scope.ingredientQuerySearch = function(query) {
                var results = query ? $scope.ingredient.list.filter(createFilterForIngredient(query)) 
                : $scope.ingredient.list.filter(createFilterForIngredient(''));
                return results;
            };

            function createFilterForIngredient(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                  
                    return (angular.lowercase(item.term).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.searchValue).indexOf(lowercaseQuery) === 0);
                };
            }

            $scope.allergy = {
                item : null,
                search : null,
                allergy: [],
                list : UtilService.allergy,

            };
            $scope.allergyQuerySearch = function(query) {
                var results = query ? $scope.allergy.list.filter(createFilterForAllergy(query)) 
                : $scope.allergy.list.filter(createFilterForAllergy(''));
                return results;
            };

            function createFilterForAllergy(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                    
                    return (angular.lowercase(item.longDescription).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.searchValue).indexOf(lowercaseQuery) === 0);
                };
            }

            $scope.diet = {
                item : null,
                search : null,
                diet: [],
                list : UtilService.diet,

            };
            $scope.dietQuerySearch = function(query) {
                var results = query ? $scope.diet.list.filter(createFilterForDiet(query)) 
                : $scope.diet.list.filter(createFilterForDiet(''));
                return results;
            };

            function createFilterForDiet(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                  
                    return (angular.lowercase(item.longDescription).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.searchValue).indexOf(lowercaseQuery) === 0);
                };
            }

            $scope.cuisine = {
                item1 : null,
                search1 : null,
                item2 : null,
                search2 : null,
                allowedCuisine: [],
                excludedCuisine:[],

                list : UtilService.cuisine,

            };
            $scope.cuisineQuerySearch = function(query) {
                var results = query ? $scope.cuisine.list.filter(createFilterForCuisine(query)) 
                : $scope.cuisine.list.filter(createFilterForCuisine(''));
                return results;
            };

            function createFilterForCuisine(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                   
                    return (angular.lowercase(item.name).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.searchValue).indexOf(lowercaseQuery) === 0);
                };
            }         

            $scope.courses = {
                item1 : null,
                search1 : null,
                item2 : null,
                search2 : null,
                allowedCourses: [],
                excludedCourses:[],

                list : UtilService.courses,

            };
            $scope.coursesQuerySearch = function(query) {
                var results = query ? $scope.courses.list.filter(createFilterForCourses(query)) 
                : $scope.courses.list.filter(createFilterForCourses(''));
                return results;
            };

            function createFilterForCourses(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                  
                    return (angular.lowercase(item.name).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.description).indexOf(lowercaseQuery) === 0);
                };
            }

            $scope.holidays = {
                item1 : null,
                search1 : null,
                item2 : null,
                search2 : null,
                allowedHolidays: [],
                excludedHolidays:[],

                list : UtilService.holidays,

            };
            $scope.holidaysQuerySearch = function(query) {
                var results = query ? $scope.holidays.list.filter(createFilterForHolidays(query)) 
                : $scope.holidays.list.filter(createFilterForHolidays(''));
                return results;
            };

            function createFilterForHolidays(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                  
                    return (angular.lowercase(item.name).indexOf(lowercaseQuery) === 0) ||
                    (angular.lowercase(item.description).indexOf(lowercaseQuery) === 0);
                };
            }
            function arrayToString(array,arrayName)
            {
                var res="";
                if(array!==undefined)
                {
                    for(var i=0;i<array.length;i++)
                    {
                        res+='&' + arrayName + '[]=' + array[i];
                    }
                }  
                return res;
            }

            function objToString(obj,objName)
            {
                
                var res="";
                if(obj!==undefined)
                {    
                    for(var i=0;i<obj.length;i++)
                    {
                        res+='&' + objName + '[]=' + (obj[i].searchValue);
                    }
                }
                return res;

            }
function getRecipes(params){              
                var queryString=UtilService.apiBase+'recipes?q='+escape($scope.queryData.q?$scope.queryData.q:'')+
                "&maxTotalTimeInSeconds="+($scope.queryData.maxTotalTimeInMinutes?$scope.queryData.maxTotalTimeInMinutes*60:null)+
                "&requirePictures=true"+
                objToString($scope.ingredient.allowedIngredient, 'allowedIngredient')+
                objToString($scope.ingredient.excludedIngredient, 'excludedIngredient')+
                objToString($scope.allergy.allergy, 'allowedAllergy')+
                objToString($scope.diet.diet, 'allowedDiet')+
                objToString($scope.cuisine.allowedCuisine, 'allowedCuisine')+
                objToString($scope.cuisine.excludedCuisines, 'excludedCuisines')+ 
                objToString($scope.courses.allowedCourses, 'allowedCourses')+
                objToString($scope.courses.excludedCourses, 'excludedCourses')+  
                objToString($scope.holidays.allowedHolidays, 'allowedHolidays')+ 
                objToString($scope.holidays.excludedHolidays, 'excludedHolidays'); 
                UtilService.setQuery(queryString);
                $location.url('/recipes');
                //$scope.recipes =[{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/gHUbrBxoYsB2PSrOO0Mh4Tq1aUGwhpQG4HiSWSauvw-sKYsQv_pQYvdci7urg8U364ABpEXNL4iYtxYPnxDq_w=s90-c"},"sourceDisplayName":"Melissa's Southern Style Kitchen","ingredients":["salted butter","granulated sugar","large eggs","pure vanilla extract","almond extract","milk","flour"],"id":"Million-Dollar-Pound-Cake-1932198","smallImageUrls":["https://lh3.googleusercontent.com/3BCoZTRnRNF9FiA_B8nJJHB5m0gqqdSVtUqOhWQ8OzWEC0_-lcA10664OiHDj7wxoygm6tyeV6T7tVni2UDs=s90"],"recipeName":"Million Dollar Pound Cake","totalTimeInSeconds":4200,"attributes":{"course":["Desserts"]},"flavors":{"piquant":0.0,"meaty":0.6666666666666666,"bitter":0.16666666666666666,"sweet":0.8333333333333334,"sour":0.16666666666666666,"salty":0.16666666666666666},"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/29bjZiRQbvYqu5MuEN1Pe4PtiNUaLWVD3Y4Vzqenz4DO3YpDXpIr-utW9hE4Jk8IAAhAUQOv45_mRnlpI2MvfCs=s90-c"},"sourceDisplayName":"Grill Girl","ingredients":["pork sausages","sweet onion","diced celery","crimini mushrooms","sweet potatoes","red apples","fresh sage","sea salt","freshly ground black pepper","eggs","raisins","chopped almonds"],"id":"Gluten-Free-Sausage-Sage-Stuffing-1933654","smallImageUrls":["https://lh3.googleusercontent.com/KrWcLdJMFWx0v-Pp5HzWv7KUcf8AYBshY_v42klh9FUBEOX2-9JDCWu1mywDpV1xlhUxJchu1xTUocjd-wtsxg=s90"],"recipeName":"Gluten Free Sausage Sage Stuffing","totalTimeInSeconds":5100,"attributes":{"course":["Side Dishes"],"holiday":["Thanksgiving"]},"flavors":{"piquant":0.0,"meaty":0.16666666666666666,"bitter":0.16666666666666666,"sweet":0.3333333333333333,"sour":0.16666666666666666,"salty":0.5},"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/RoEvObm3h_NIlQ6MLZZibXx5wIlS-BNy0XGiF5aILB1q8YcDhN1RZOMw432vuRoKIN_HrkAkcQ_a86bLW4-4CA=s90-c"},"sourceDisplayName":"Grow A Good Life","ingredients":["green chilies","garlic cloves","jalapeno chilies","chicken stock","extra-virgin olive oil","fresh lime juice","taco seasoning","salt"],"id":"Roasted-Green-Chile-Sauce-1930360","smallImageUrls":["https://lh3.googleusercontent.com/JV6PfvwK1_jt628Lh4pwkcCib6qXGkaP3UoZg8qgMUiN01VEkSk443K0wgoNfNhHfQvi8_6GivoQVM7ykmYoAg=s90"],"recipeName":"Roasted Green Chile Sauce","totalTimeInSeconds":900,"attributes":{"course":["Condiments and Sauces"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/peTQloC-_PXKQPXIRrdZdmkvCNO6nVPbAQEf8T6Bs-XFAFZropYGm5hP68XONOnycVRlxvtpvgo4yZbeEDFx-Y4=s90-c"},"sourceDisplayName":"Caroline Kaufman, MS, RDN","ingredients":["vegetable oil cooking spray","dark chocolate","cacao","candied orange peel","salted pistachios","dried cranberries","sea salt"],"id":"Dark-Chocolate-Bark-with-Candied-Orange-Peel_-Pistachios-and-Cranberries-1925750","smallImageUrls":["https://lh3.googleusercontent.com/oskMBye4yQVYTG4kof_kcgxYGiqLwZ0IeHnG2lOZeGmaeaKfie5U-1847FsrVvP_lfu5qUjY_CKRbmU3VWdK4Q=s90"],"recipeName":"Dark Chocolate Bark with Candied Orange Peel, Pistachios and Cranberries","totalTimeInSeconds":2700,"attributes":{"course":["Desserts"],"holiday":["Christmas"]},"flavors":null,"rating":3},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/hv96m6ioM-1MANR2FJb4Ka8TcyIXMNUSvYQbXGoOAdNUuD5fWG8xjFkLce6cWaPMeszADWmTMjENQzH7dG1K=s90-c"},"sourceDisplayName":"Grill Girl","ingredients":["pie crust","unsalted butter","light brown sugar","light corn syrup","bourbon whiskey","orange zest","eggs","cinnamon","vanilla","salt","pecan halves"],"id":"Bourbon-and-Smoked-Pecan-Pie-1933629","smallImageUrls":["https://lh3.googleusercontent.com/vSKZ4xs3Ykc8f6G5xUe5n78p2CKGWTLz8na7u9OyMBE_zX2bUo6hjN6-kz6bB9j3KytJpWuMHuFZtuz78KvR=s90"],"recipeName":"Bourbon and Smoked Pecan Pie","totalTimeInSeconds":3900,"attributes":{"course":["Desserts"],"cuisine":["Southern & Soul Food"]},"flavors":{"piquant":0.0,"meaty":0.8333333333333334,"bitter":0.16666666666666666,"sweet":0.8333333333333334,"sour":0.16666666666666666,"salty":0.3333333333333333},"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/MZRa4pi4RL2sYgHssGTkCoaHyTIf5CADKIpUwpoRfZlG5C-2Nh67v20E-YvbHn6loPVJEQu6NWoaxDZwjQJP=s90-c"},"sourceDisplayName":"Table for Two","ingredients":["pizza doughs","marinara sauce","mozzarella cheese","large tomato","basil"],"id":"Grilled-Caprese-Pizza-1933852","smallImageUrls":["https://lh3.googleusercontent.com/PewtznwjF1sUX1aEjUvosUER5VMpnB6biaI2tgLTWLgSxIqli-8EdcWgo_lF5z2J3fu_sfIEao8Oe4DHvo3DQLE=s90"],"recipeName":"Grilled Caprese Pizza","totalTimeInSeconds":1800,"attributes":{"course":["Main Dishes"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/Zut2JRyFRShtksbOf7UEKmFY-mocRR-nM0bNLf_kr15rVpIuIXNcnjh1dT0VC8VKqX0GpLXHsCGN-fuaIPHftLs=s90-c"},"sourceDisplayName":"The Yummy Life","ingredients":["grated parmesan cheese","garlic powder","paprika","dried oregano","kosher salt","freshly ground black pepper","olive oil","baby potatoes","sour cream","scallions"],"id":"Parmesan-Garlic-Roasted-Baby-Potatoes-1932075","smallImageUrls":["https://lh3.googleusercontent.com/0VaWqSKDeWPom92pIiRSBIWQEdV12aIuvLA0qEovH_fxQ_6chJOCCJaGAKL3wckjSnx68U9Bz8mjHvBeK232Wm8=s90"],"recipeName":"Parmesan Garlic Roasted Baby Potatoes","totalTimeInSeconds":3600,"attributes":{"course":["Side Dishes"],"holiday":["Sunday Lunch"]},"flavors":{"piquant":0.16666666666666666,"meaty":0.16666666666666666,"bitter":0.3333333333333333,"sweet":0.16666666666666666,"sour":0.8333333333333334,"salty":0.6666666666666666},"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/ldiYKCjGCkpQIxgRYJIUhunL-TlfJvQ2hJAELSnwF6-uzotenbnjfdg1tck31C70amBDwYxV-ygnHDplQn8UYQ=s90-c"},"sourceDisplayName":"Basic N Delicious","ingredients":["rice","water","cinnamon sticks","sugar","sweetened condensed milk","heavy cream","raisins","grated coconut","butter","milk","vanilla extract","queso fresco","orange zest"],"id":"Arroz-con-Leche-with-Coconut-and-Cheese-_SundaySupper-1924217","smallImageUrls":["https://lh3.googleusercontent.com/FaCGEPA592ntQUxrHTlDs9MG2lOPSAFZr8mMYcc0tr_FI_1G_5jUi_zu0tpHcICtPaAi7o2NpaRlafBCC6nPoUo=s90"],"recipeName":"Arroz con Leche with Coconut and Cheese #SundaySupper","totalTimeInSeconds":3000,"attributes":{"course":["Desserts"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/q_OjDHdkl79a3ccvVxk1U5fcvRFXgJlZSo4vXGpN7w-wKj33w9Bgyf5ISO9fs70hr0dxbNLH9S5YyuzooeUJQeY=s90-c"},"sourceDisplayName":"My Blessed Southern Life","ingredients":["frozen tater tots","bacon pieces","boneless skinless chicken breasts","milk","sharp cheddar cheese"],"id":"Crock-Pot-Chicken-Tater-Tot-Casserole-1926840","smallImageUrls":["https://lh3.googleusercontent.com/z6d33m7EDGqS5vlkPg941BzVF0xq6INuwpAtYM0WmrHI4RN1-ZIge85jM4V8UeOqgrLMxUOkqBYAliQ0G-D7Dw=s90"],"recipeName":"Crock Pot Chicken Tater Tot Casserole","totalTimeInSeconds":4800,"attributes":{"course":["Main Dishes"],"cuisine":["Kid-Friendly"]},"flavors":null,"rating":4},{"imageUrlsBySize":{"90":"https://lh3.googleusercontent.com/MkWeSULRownTk3VMgUc4Af0pjTcX6FiD6fCPyPdhJ8AAclTPiT-1vbkMbydLwDpqxZMfpci6F11Ahi480kYFyVs=s90-c"},"sourceDisplayName":"Simply Made Recipes","ingredients":["butter","creamy peanut butter","vanilla extract","confectioners sugar"],"id":"Peanut-Butter-Fudge-Shapes-1932353","smallImageUrls":["https://lh3.googleusercontent.com/lK8IBII06rAO3WDMX4e2jwqqKtKppQc3ZXZ6mdIvPShqImLIDxsh-PTG5vaXXKj9zsTPz2cKgcrCXLHQqtYJqi0=s90"],"recipeName":"Peanut Butter Fudge Shapes","totalTimeInSeconds":3000,"attributes":{"course":["Desserts"]},"flavors":{"sweet":0.8333333333333334,"piquant":0.0,"sour":0.0,"salty":0.5,"meaty":0.8333333333333334,"bitter":0.3333333333333333},"rating":4}];
            }

            $scope.recipeQuery=function(){
                getRecipes();
            }

        }
        ]);
})();            