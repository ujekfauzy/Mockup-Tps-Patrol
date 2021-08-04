(function ($) {
    function Tree() {
        var $this = this;

        function treeNodeClick() {
            $(document).on('click', '.trees li a input[type="checkbox"]', function () {
                $(this).closest('li').find('ul input[type="checkbox"]').prop('checked', $(this).is(':checked'));
            }).on('click', '.node-item', function () {
                var parentNode = $(this).parents('.trees ul');
                if ($(this).is(':checked')) {
                    parentNode.find('li a .parent').prop('checked', true);
                } else {
                    var elements = parentNode.find('ul input[type="checkbox"]:checked');
                    if (elements.length == 0) {
                        parentNode.find('li a .parent').prop('checked', false);
                    }
                }
            }).on('click', '.node-item-2', function () {
                if ($(this).is(':checked')) {
                    $(this).parents('.trees ul').find('li a .parent').prop('checked', true);
                    $(this).parents('li li').find('a .node-item').prop('checked', true);
                } else {
                    var elements = $(this).parents('li li').find('ul input[type="checkbox"]:checked');
                    if (elements.length == 0) {
                        $(this).parents('.trees ul').find('li a .parent').prop('checked', false);
                        $(this).parents('li li').find('a .node-item').prop('checked', false);
                    }
                }
            });
        };

        $this.init = function () {
            treeNodeClick();
        }
    }
    $(function () {
        var self = new Tree();
        self.init();
    })
}(jQuery))  