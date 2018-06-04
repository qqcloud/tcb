[![view on npm](http://img.shields.io/npm/v/example.svg)](https://www.npmjs.org/package/example)

## Modules

<dl>
<dt><a href="#module_app/routes">app/routes</a></dt>
<dd><p>Main route config module</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#AjaxCgiBase">AjaxCgiBase</a> ⇐ <code><a href="#CgiBase">CgiBase</a></code></dt>
<dd><p>Class AjaxCgiBase</p>
</dd>
<dt><a href="#CgiBase">CgiBase</a></dt>
<dd><p>Class CgiBase</p>
</dd>
<dt><a href="#PageCgiBase">PageCgiBase</a> ⇐ <code><a href="#CgiBase">CgiBase</a></code></dt>
<dd><p>Class PageCgiBase</p>
</dd>
</dl>

<a name="module_app/routes"></a>

## app/routes
Main route config module

<a name="exp_module_app/routes--module.exports"></a>

### module.exports ⏏
Main route config

**Kind**: Exported member  
<a name="AjaxCgiBase"></a>

## AjaxCgiBase ⇐ [<code>CgiBase</code>](#CgiBase)
Class AjaxCgiBase

**Kind**: global class  
**Extends**: [<code>CgiBase</code>](#CgiBase)  

* [AjaxCgiBase](#AjaxCgiBase) ⇐ [<code>CgiBase</code>](#CgiBase)
    * [new AjaxCgiBase()](#new_AjaxCgiBase_new)
    * [.handle()](#AjaxCgiBase+handle)
    * [.send(data)](#AjaxCgiBase+send)
    * [.injectServices()](#CgiBase+injectServices)

<a name="new_AjaxCgiBase_new"></a>

### new AjaxCgiBase()
Create a AjaxCgiBase

<a name="AjaxCgiBase+handle"></a>

### ajaxCgiBase.handle()
Handle route of ajax

**Kind**: instance method of [<code>AjaxCgiBase</code>](#AjaxCgiBase)  
**Overrides**: [<code>handle</code>](#CgiBase+handle)  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="AjaxCgiBase+send"></a>

### ajaxCgiBase.send(data)
Send data for request

**Kind**: instance method of [<code>AjaxCgiBase</code>](#AjaxCgiBase)  
**Datetime**: 2018-05-30  
**Author**: jerishi  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | response info |

<a name="CgiBase+injectServices"></a>

### ajaxCgiBase.injectServices()
inject `service instances`

**Kind**: instance method of [<code>AjaxCgiBase</code>](#AjaxCgiBase)  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="CgiBase"></a>

## CgiBase
Class CgiBase

**Kind**: global class  

* [CgiBase](#CgiBase)
    * [new CgiBase(ctx, next)](#new_CgiBase_new)
    * _instance_
        * [.injectServices()](#CgiBase+injectServices)
        * [.handle()](#CgiBase+handle)
    * _static_
        * [.makeRouteHandler()](#CgiBase.makeRouteHandler) ⇒ <code>function</code>

<a name="new_CgiBase_new"></a>

### new CgiBase(ctx, next)
Create a CgiBase


| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | app ctx |
| next | <code>function</code> | app next |

<a name="CgiBase+injectServices"></a>

### cgiBase.injectServices()
inject `service instances`

**Kind**: instance method of [<code>CgiBase</code>](#CgiBase)  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="CgiBase+handle"></a>

### cgiBase.handle()
child class should define this method

**Kind**: instance method of [<code>CgiBase</code>](#CgiBase)  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="CgiBase.makeRouteHandler"></a>

### CgiBase.makeRouteHandler() ⇒ <code>function</code>
static function：make route handler

**Kind**: static method of [<code>CgiBase</code>](#CgiBase)  
**Returns**: <code>function</code> - route handle  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="PageCgiBase"></a>

## PageCgiBase ⇐ [<code>CgiBase</code>](#CgiBase)
Class PageCgiBase

**Kind**: global class  
**Extends**: [<code>CgiBase</code>](#CgiBase)  

* [PageCgiBase](#PageCgiBase) ⇐ [<code>CgiBase</code>](#CgiBase)
    * [new PageCgiBase()](#new_PageCgiBase_new)
    * [.handle()](#PageCgiBase+handle)
    * [.injectServices()](#CgiBase+injectServices)

<a name="new_PageCgiBase_new"></a>

### new PageCgiBase()
Create a PageCgiBase

<a name="PageCgiBase+handle"></a>

### pageCgiBase.handle()
Handle route of page

**Kind**: instance method of [<code>PageCgiBase</code>](#PageCgiBase)  
**Overrides**: [<code>handle</code>](#CgiBase+handle)  
**Datetime**: 2018-05-30  
**Author**: jerishi  
<a name="CgiBase+injectServices"></a>

### pageCgiBase.injectServices()
inject `service instances`

**Kind**: instance method of [<code>PageCgiBase</code>](#PageCgiBase)  
**Datetime**: 2018-05-30  
**Author**: jerishi  

* * *

&copy; 1942-2016 Muhammad Ali