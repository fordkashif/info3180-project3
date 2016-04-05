


angular.module('MyApp').controller('ModalDemoCtrl' , function ($scope, $modal,$rootScope) {

    $scope.image = {
        url : "basic"

    };


    $scope.open = function () {

        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log,image,$http, $modal) {
                $scope.image = image;
                $scope.error = false;
                $scope.disabled = true;
                $scope.images=[];
                $scope.submit = function () {
                    
                                    $rootScope.$broadcast("site",$scope.image);
                                    $http.post('/api/thumbnail/process', {url: $scope.image})
                                    .success(function (data) {
                                      if (data.message == 'Unable to extract thumbnails') {
                                          $log.log(data);
                                          $modalInstance.dismiss('cancel');
                                          } else if(data.message == 'Success'){
                                            $log.log(data);
                                            $scope.images = data.data.thumbnails.images;
                                            console.log($scope.images);
                                            $modalInstance.dismiss('cancel');
                                          $modal.open({
                                                templateUrl: 'imageSelect.html',
                                                backdrop: true,
                                                windowClass: 'modal',
                                                data : $scope.images,
                                               controller: function ($scope,$log,$modalInstance,$modal) {
                                                   $scope.images = data.data.thumbnails.images;

                                                   $scope.getImgUrl = function (item) {
                                                    $log.log(item);
                                                    $scope.imgUrl = $scope.images[item];
                                                       $log.log($scope.imgUrl);
                                                       $rootScope.$broadcast("image",$scope.imgUrl );
                                                    $scope.row = item;
                                                   };
                                                   $scope.submit = function () {
                                                   $modalInstance.dismiss('cancel');                                                  

                                                    };

                                                    $scope.cancel = function (){
                                                      $modalInstance.dismiss('cancel');
                                                  };
                                               }
                                            
                                            })
                                              }
                                            })
                                              .error(function(error) {
                                              $log.log(error);
                                              $modalInstance.dismiss('cancel');
                                            });
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                image: function () {
                    return $scope.image;
                }
            }
        });
    };
});

angular.module('MyApp').controller('form', ['$scope','$rootScope','$log','$http','$window', function($scope,$rootScope,$log,$http,$window) {

    $rootScope.$on('image', function (event, data) {
              $scope.img = data;
    });
        $rootScope.$on('site', function (event, data) {
              $scope.url = data.url;
        });
          $scope.list = [];
          $scope.title = ""
          $scope.description = "";
            $scope.priority = 1;

      
            $log.log($scope.title);
      $scope.submit = function() {
        if ($scope.description && $scope.priority && $scope.title) {
            var userid= localStorage.getItem('currentUser')
            $http.post('/api/user/'+userid+'/wishlist', {priority: $scope.priority, title: $scope.title , url: $scope.url, thumbnail: $scope.img, description: $scope.description})
              .success(function (data) {
                if (data.message=="Success"){
                  $log.log(data);

              }else if(data.message=="No such wishlist exists"){
                  $log.log(data);

              }
            })
              .error(function(error) {
                    $log.log(error);
              });

            $log.log($scope.img);
            $log.log($scope.title);
            $log.log($scope.url);
            $log.log($scope.priority);
          $log.log(this.description);
          $scope.wishlist = function() {
        $window.location.href = '/#/wishlist';
      };

        }
      };
      $scope.wishlist = function() {
        $window.location.href = '/#/wishlist';
      };
    }]);