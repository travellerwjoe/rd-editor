/**
 * @preserve RDEditorRenderer.js
 * @author joe.wu
 * @version 0.1.0
 */
import './styles/index.css'
(function (root, factory) {
    if (typeof window.define === 'function' && window.define.amd) {
        // AMD
        window.define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        window.RDEditorRenderer = factory();
    }
}(this, function () {
    return (function () {
        var animateScrollTo = (function () {
            'use strict';

            // desiredOffset - page offset to scroll to
            // speed - duration of the scroll per 1000px
            function __ANIMATE_SCROLL_TO(desiredOffset) {
                var userOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                if (desiredOffset instanceof HTMLElement) {
                    if (userOptions.element && userOptions.element instanceof HTMLElement) {
                        desiredOffset = (desiredOffset.getBoundingClientRect().top + userOptions.element.scrollTop)
                            - userOptions.element.getBoundingClientRect().top;
                    } else {
                        var scrollTop = window.scrollY || document.documentElement.scrollTop;
                        desiredOffset = scrollTop + desiredOffset.getBoundingClientRect().top;
                    }
                }

                var defaultOptions = {
                    speed: 500,
                    minDuration: 250,
                    maxDuration: 1500,
                    cancelOnUserAction: true,
                    element: window,
                    onComplete: undefined,
                };

                var options = {};

                Object.keys(defaultOptions).forEach(function (key) {
                    options[key] = userOptions[key] ? userOptions[key] : defaultOptions[key];
                });

                options.isWindow = options.element === window;

                var initialScrollPosition = null;
                var maxScroll = null;

                if (options.isWindow) {
                    // get cross browser scroll position
                    initialScrollPosition = window.scrollY || document.documentElement.scrollTop;
                    // cross browser document height minus window height
                    maxScroll = Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                    ) - window.innerHeight;
                } else {
                    // DOM element
                    initialScrollPosition = options.element.scrollTop;
                    maxScroll = options.element.scrollHeight - options.element.clientHeight;
                }

                // If the scroll position is greater than maximum available scroll
                if (desiredOffset > maxScroll) {
                    desiredOffset = maxScroll;
                }

                // Calculate diff to scroll
                var diff = desiredOffset - initialScrollPosition;

                // Do nothing if the page is already there
                if (diff === 0) {
                    // Execute callback if there is any
                    if (options.onComplete && typeof options.onComplete === 'function') {
                        options.onComplete()
                    }

                    return;
                }

                // Calculate duration of the scroll
                var duration = Math.abs(Math.round((diff / 1000) * options.speed));

                // Set minimum and maximum duration
                if (duration < options.minDuration) {
                    duration = options.minDuration;
                } else if (duration > options.maxDuration) {
                    duration = options.maxDuration;
                }

                var startingTime = Date.now();

                // Request animation frame ID
                var requestID = null;

                // Method handler
                var handleUserEvent = null;

                if (options.cancelOnUserAction) {
                    // Set handler to cancel scroll on user action
                    handleUserEvent = function () {
                        removeListeners();
                        cancelAnimationFrame(requestID);
                    };
                    window.addEventListener('keydown', handleUserEvent);
                    window.addEventListener('mousedown', handleUserEvent);
                } else {
                    // Set handler to prevent user actions while scroll is active
                    handleUserEvent = function (e) { e.preventDefault(); };
                    window.addEventListener('scroll', handleUserEvent);
                }

                window.addEventListener('wheel', handleUserEvent);
                window.addEventListener('touchstart', handleUserEvent);

                var removeListeners = function () {
                    window.removeEventListener('wheel', handleUserEvent);
                    window.removeEventListener('touchstart', handleUserEvent);

                    if (options.cancelOnUserAction) {
                        window.removeEventListener('keydown', handleUserEvent);
                        window.removeEventListener('mousedown', handleUserEvent);
                    } else {
                        window.removeEventListener('scroll', handleUserEvent);
                    }
                };

                var step = function () {
                    var timeDiff = Date.now() - startingTime;
                    var t = (timeDiff / duration) - 1;
                    var easing = t * t * t + 1;
                    var scrollPosition = Math.round(initialScrollPosition + (diff * easing));

                    if (timeDiff < duration && scrollPosition !== desiredOffset) {
                        // If scroll didn't reach desired offset or time is not elapsed
                        // Scroll to a new position
                        // And request a new step

                        if (options.isWindow) {
                            options.element.scrollTo(0, scrollPosition);
                        } else {
                            options.element.scrollTop = scrollPosition;
                        }

                        requestID = requestAnimationFrame(step);
                    } else {
                        // If the time elapsed or we reached the desired offset
                        // Set scroll to the desired offset (when rounding made it to be off a pixel or two)
                        // Clear animation frame to be sure
                        if (options.isWindow) {
                            options.element.scrollTo(0, desiredOffset);
                        } else {
                            options.element.scrollTop = desiredOffset;
                        }
                        cancelAnimationFrame(requestID);

                        // Remove listeners
                        removeListeners();

                        // Animation is complete, execute callback if there is any
                        if (options.onComplete && typeof options.onComplete === 'function') {
                            options.onComplete()
                        }
                    }
                };

                // Start animating scroll
                requestID = requestAnimationFrame(step);
            }

            return __ANIMATE_SCROLL_TO
        }).call(this);

        function RDEditorRenderer(data) {
            this.data = data
            this.content = this.data.content
            this.header = this.data.header
            this.classes = {
                row: 'ory-row',
                cell: 'ory-cell',
                cellInner: 'ory-cell-inner',
                cellleaf: 'ory-cell-leaf',
                pluginImage: 'ory-plugins-content-image'
            }
            this.headerHtml = ''
            this.contentHtml = ''
            this.anchorNavHtml = ''
            this.anchorNavData = []
            this.isMobile = document.body.offsetWidth < 800
            this.init()
        }

        RDEditorRenderer.prototype = {
            init: function () {
                this.headerHtml = this.getHeaderHtml()
                this.contentHtml = this.getContentHtml()
                this.anchorNavHtml = this.getAnchorNavHtml()
                this.render()
                this.resize()
                this.bind()
            },
            bind: function () {
                var self = this,
                    containerTop = document.querySelector('.container').offsetTop,
                    pageHeaderHeight = document.getElementById('RDPageHeader').offsetHeight,
                    anchorNavHeight = document.querySelector('.anchor-nav').offsetHeight,
                    interval

                var scroll = function () {
                    var scrollTop = window.scrollY,
                        titleEl = document.querySelectorAll('.anchor-title')

                    for (var i = titleEl.length - 1; i >= 0; i--) {
                        var item = titleEl[i]

                        var top = self.getElementTop(item) - 10 - containerTop,
                            name = item.getAttribute('name'),
                            nav = document.querySelector('.anchor-nav')

                        if (scrollTop >= top) {
                            var target = nav.querySelector('li[name="' + name + '"]')
                            var navLis = nav.querySelectorAll('li')
                            for (var i = 0; i < navLis.length; i++) {
                                var navLi = navLis[i]
                                navLi.style = null
                            }
                            target.style.background = '#7e57c2'
                            target.style.color = '#fff'
                            break
                        }
                    }
                }

                var navigate = function (e) {
                    var el = e.target,
                        name = el.getAttribute('name'),
                        targetEl = document.querySelector('.anchor-title[name="' + name + '"]'),
                        top = self.getElementTop(targetEl) - 10

                    if (self.isMobile) {
                        top -= anchorNavHeight
                    }

                    animateScrollTo(top, {
                        speed: 1000
                    })
                }

                window.addEventListener('scroll', scroll)
                this.addEvent(document.querySelectorAll('.anchor-nav-list li'), 'click', navigate)

            },
            getHeaderHtml: function () {
                var header = this.header
                return '<div class="page-header">' +
                    (header.title ? '<h1>' + header.title + '</h1>' : '') +
                    '<div style="color:#888;">' +
                    (header.author ? '<span>作者：' + header.author + '</span>' : '') +
                    (header.date ? '<span style="margin-left:5px">' + header.date + '</span>' : '') +
                    (header.location ? '<span>' + header.location + '</span>' : '') +
                    '</div>' +
                    '</div>'
            },
            getContentHtml: function () {
                var self = this,
                    contentHtml = '',
                    cRow = this.classes.row,
                    cCell = this.classes.cell,
                    cCellInner = this.classes.cellInner,
                    cCellLeaf = this.classes.cellleaf,
                    cPluginImage = this.classes.pluginImage

                var cCellGrid = function (size) {
                    return cCell + '-sm-' + size + ' ' + cCell + '-xs-' + 12
                }

                var gAnchorTitleHtml = function (state) {
                    return '<div class="anchor-title-container">' +
                        '<span class="anchor-title-line"></span>' +
                        '<div class="anchor-title" name="' + state.id + '">' +
                        state.value +
                        '</div>' +
                        '</div>'
                }

                var gSlateHtml = function (state) {
                    var html = '',
                        tagMap = {
                            "PARAGRAPH/PARAGRAPH": 'p',
                            "BLOCKQUOTE/BLOCKQUOTE": 'blockquote',
                            "LISTS/UNORDERED-LIST": 'ul',
                            "LISTS/ORDERED-LIST": 'ol',
                            "LISTS/LIST-ITEM": 'li',
                            "HEADINGS/HEADING-ONE": 'h1',
                            "HEADINGS/HEADING-TWO": 'h2',
                            "HEADINGS/HEADING-THREE": 'h3',
                            "HEADINGS/HEADING-FOUR": 'h4',
                            "HEADINGS/HEADING-FIVE": 'h5',
                            "HEADINGS/HEADING-SIX": 'h6',
                            "EMPHASIZE/STRONG": 'strong',
                            "EMPHASIZE/EM": 'em',
                            "EMPHASIZE/U": 'u',
                            "LINK/LINK": 'a',
                            "CODE/CODE": 'code',
                        }

                    var gTag = function (type, text, data) {
                        var tag = tagMap[type],
                            html = '<' + tag

                        if (data) {
                            if (data.align) {
                                html += ' style="text-align:' + data.align + ';"'
                            }
                        }

                        html += '>' + text + '</' + tag + '>'
                        return html
                    }

                    var eachRanges = function (ranges) {
                        var html = ''
                        for (var i = 0; i < ranges.length; i++) {
                            var range = ranges[i],
                                marks = range.marks,
                                marksHtml = ''

                            if (marks && range.text) {
                                marksHtml = range.text
                                for (var j = 0; j < marks.length; j++) {
                                    var mark = marks[j]
                                    if (mark.type) {
                                        marksHtml = gTag(mark.type, marksHtml)
                                    }
                                }
                                html += marksHtml
                            } else {
                                html += range.text
                            }
                        }
                        return html
                    }

                    !function eachNodes(nodes, type, data) {
                        var tag = tagMap[type]
                        if (type) {
                            html += '<' + tag
                            if (data) {
                                if (data.href) {
                                    html += ' href="' + data.href + '"'
                                }
                                if (data && data.align) {
                                    html += ' style="text-align:' + data.align + ';"'
                                }
                            }
                            html += '>'
                        }
                        for (var i = 0; i < nodes.length; i++) {
                            var node = nodes[i]
                            if (node.kind === 'block' || node.kind === 'inline') {
                                eachNodes(node.nodes, node.type, node.data)
                            } else if (node.kind === 'text') {
                                if (node.ranges) {
                                    html += eachRanges(node.ranges)
                                } else if (node.text) {
                                    html += node.text
                                }
                            }
                        }
                        html += '</' + tag + '>'
                    }(state.serialized.nodes)
                    return html
                }

                var gImageHtml = function (state) {
                    return '<img class="' + cPluginImage + '" src="' + state.src + '">'
                }

                !function eachCells(cells) {
                    for (var i = 0; i < cells.length; i++) {
                        var cell = cells[i]

                        if (cell.cells) {
                            contentHtml += '<div class="' + cRow + ' ' + cCellInner + '">'
                            eachCells(cell.cells)
                            contentHtml += '</div>'
                        }
                        if (cell.rows || cell.size) {
                            contentHtml += '<div class="' + cCell + ' ' + cCellGrid(cell.size) + '">'
                            if (cell.rows) {
                                eachCells(cell.rows)
                                contentHtml += '</div>'
                            }
                        }
                        if (cell.content) {
                            var pluginName = cell.content.plugin && cell.content.plugin.name,
                                state = cell.content.state
                            contentHtml += '<div class="' + cCellInner + ' ' + cCellLeaf + '">'

                            if (pluginName === 'AnchorTitle') {
                                contentHtml += gAnchorTitleHtml(state)
                                self.anchorNavData.push(state)
                            }

                            if (pluginName === 'slate') {
                                contentHtml += gSlateHtml(state)
                            }

                            if (pluginName === 'image') {
                                contentHtml += gImageHtml(state)
                            }

                            contentHtml += '</div>'

                            if (cell.size) {
                                contentHtml += '</div>'
                            }
                        }

                    }
                }(this.content.cells)

                return contentHtml
            },
            getAnchorNavHtml: function () {
                var html = '<div class="anchor-nav">' +
                    '<ul class="anchor-nav-list">'
                for (var i = 0; i < this.anchorNavData.length; i++) {
                    var item = this.anchorNavData[i]
                    html += '<li name="' + item.id + '"'
                    if (i === 0) {
                        html += ' style="background:rgb(126, 87, 194);color:#fff;"'
                    }
                    html += '>' + item.value + '</li>'
                }
                html += '</ul>' +
                    '</div>'
                return html
            },
            render: function () {
                document.getElementById('RDPageHeader').innerHTML = this.headerHtml
                document.getElementById('RDEditor').innerHTML = this.contentHtml
                document.getElementById('RDAnchorNav').innerHTML = this.anchorNavHtml
            },
            resize: function () {
                //有锚点菜单并且在平板或手机上浏览
                if (this.anchorNavData.length && document.body.offsetWidth < 800) {
                    document.querySelector('.container').style.marginTop = '60px'
                }
            },
            addEvent: function (el, event, handler) {
                if (window.attachEvent) {
                    if (el.length > 1) {
                        for (var i = 0; i < el.length; i++) {
                            el.attachEvent(event, handler)
                        }
                    }
                } else if (window.addEventListener) {
                    if (el.length > 1) {
                        for (var i = 0; i < el.length; i++) {
                            el[i].addEventListener(event, handler, false)
                        }
                    }
                }
            },
            getElementTop: function (element) {
                var actualTop = element.offsetTop;
                var current = element.offsetParent;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                return actualTop;
            }
        }

        return RDEditorRenderer

    })()
}));