(function () {
    'use strict';

    angular
        .module('acmeApp')
        .controller('ACMEPassPwdGenController', ACMEPassPwdGenController);

    ACMEPassPwdGenController.$inject = ['$timeout', '$scope', '$uibModalInstance'];

    function ACMEPassPwdGenController($timeout, $scope, $uibModalInstance) {
        var vm = this;

        vm.clear = clear;
        vm.generate = generate;
        vm.save = save;

        vm.genOptions = {
            length: 8,
            lower: true,
            upper: true,
            digits: true,
            special: true,
            repetition: false
        };

        vm.chars = {
            lower: "qwertyuiopasdfghjklzxcvbnm",
            upper: "QWERTYUIOPASDFGHJKLZXCVBNM",
            digits: "0123456789",
            special: "!@#$%-_"
        };

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function generate() {
            var chars = "";
            vm.password = "";
            var count = 0;

            if (vm.genOptions.lower) {
                chars += vm.chars.lower;
            }

            if (vm.genOptions.upper) {
                chars += vm.chars.upper;
            }

            if (vm.genOptions.digits) {
                chars += vm.chars.digits;
            }

            if (vm.genOptions.special) {
                chars += vm.chars.special;
            }

            // Changed for loop to while loop
            // This ensures desired password length is achieved given no repeated characters
            while (count != vm.genOptions.length) {

                // Do not crash the application when no options were selected, just generate an empty string
                if (!vm.genOptions.lower && !vm.genOptions.upper && !vm.genOptions.digits && !vm.genOptions.special && !vm.genOptions.repetition) {
                     break;
                }

                // Changed Math.round() to Math.floor()
                // Math.round() makes position [vm.getOptions.length] a possibility, hence "undefined" exceptions
                var position = Math.floor(Math.random() * chars.length);
                
                if (vm.genOptions.repetition) {
                    if (vm.password.indexOf(chars[position]) === -1) {
                        vm.password += chars[position];
                        count++;
                    }
                } else {
                    vm.password += chars[position];
                    count++;
                }
            }
        }

        function save() {
            $scope.$emit('acmeApp:ACMEPassPwdGen', vm.password);
            $uibModalInstance.close(vm.password);
        }
    }
})();