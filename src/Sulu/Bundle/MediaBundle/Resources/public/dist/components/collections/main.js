define(["sulumedia/collection/collections","sulumedia/collection/medias","sulumedia/model/collection","sulumedia/model/media"],function(a,b,c,d){"use strict";var e={FILES:"files",SETTINGS:"settings"},f={lastVisitedCollectionKey:"last-visited-collection"},g="sulu.media.collections.",h=function(){return y.call(this,"list")},i=function(){return y.call(this,"delete-media")},j=function(){return y.call(this,"move-media")},k=function(){return y.call(this,"reload-single-media")},l=function(){return y.call(this,"reload-media")},m=function(){return y.call(this,"delete-collection")},n=function(){return y.call(this,"media-deleted")},o=function(){return y.call(this,"collection-deleted")},p=function(){return y.call(this,"media-saved")},q=function(){return y.call(this,"edit-media")},r=function(){return y.call(this,"save-media")},s=function(){return y.call(this,"save-collection")},t=function(){return y.call(this,"reload-collection")},u=function(){return y.call(this,"collection-changed")},v=function(){return y.call(this,"collection-edit")},w=function(){return y.call(this,"collection-list")},x=function(){return y.call(this,"download-media")},y=function(a){return g+a};return{initialize:function(){this.collections=new a,this.medias=new b,this.getLocale().then(function(a){if(this.locale=a,this.bindCustomEvents(),"list"===this.options.display)this.renderList();else if("files"===this.options.display)this.renderCollectionEdit({activeTab:"files"});else{if("settings"!==this.options.display)throw"display type wrong";this.renderCollectionEdit({activeTab:"settings"})}this.startMediaEdit()}.bind(this))},getLocale:function(){var a=this.sandbox.data.deferred();return this.sandbox.emit("sulu.media.collections-edit.get-locale",function(b){a.resolve(b)}.bind(this)),"list"===this.options.display&&a.resolve(this.sandbox.sulu.user.locale),a.promise()},getMediaModel:function(a){if(this.medias.get(a))return this.medias.get(a);var b=new d;return a&&b.set({id:a}),this.medias.push(b),b},getCollectionModel:function(a){if(this.collections.get(a))return this.collections.get(a);var b=new c;return a&&b.set({id:a}),this.collections.push(b),b},bindCustomEvents:function(){this.sandbox.on(h.call(this),function(a){this.sandbox.emit("sulu.router.navigate","media/collections",a?!1:!0,!0)},this),this.sandbox.on(i.call(this),this.deleteMedia.bind(this)),this.sandbox.on(j.call(this),this.moveMedia.bind(this)),this.sandbox.on(m.call(this),this.deleteCollection.bind(this)),this.sandbox.on(q.call(this),this.editMedia.bind(this)),this.sandbox.on(r.call(this),this.saveMedia.bind(this)),this.sandbox.on(s.call(this),this.saveCollection.bind(this)),this.sandbox.on(t.call(this),this.reloadCollection.bind(this)),this.sandbox.on(k.call(this),this.reloadSingleMedia.bind(this)),this.sandbox.on(l.call(this),this.reloadMedia.bind(this)),this.sandbox.on(x.call(this),this.downloadMedia.bind(this)),this.sandbox.on(v.call(this),function(a,b){b=b?b:"files",this.sandbox.emit("sulu.router.navigate","media/collections/edit:"+a+"/"+b,!0,!0)}.bind(this)),this.sandbox.on(w.call(this),function(){this.sandbox.emit("sulu.router.navigate","media/collections",!0,!0)}.bind(this))},downloadMedia:function(a){var b;this.medias.get(a)?(b=this.getMediaModel(a),this.sandbox.dom.window.location.href=b.toJSON().url):(b=this.getMediaModel(a),b.fetch({success:function(a){this.sandbox.dom.window.location.href=a.toJSON().url}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single media")}.bind(this)}))},saveCollection:function(a,b){var c=this.getCollectionModel(a.id);c.set(a),c.save(null,{success:function(a){this.sandbox.emit(u.call(this),a.toJSON()),"function"==typeof b&&b(a.toJSON())}.bind(this),error:function(){this.sandbox.logger.log("Error while saving collection")}.bind(this)})},reloadCollection:function(a,b,c){var d=this.getCollectionModel(a);d.fetch({data:b,success:function(a){"function"==typeof c&&c(a.toJSON())}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single collection")}.bind(this)})},reloadSingleMedia:function(a,b,c){var d=this.getMediaModel(a);d.fetch({data:b,success:function(a){"function"==typeof c&&c(a.toJSON())}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single media")}.bind(this)})},reloadMedia:function(a,b,c){var d=[];this.sandbox.util.foreach(a,function(e){this.reloadSingleMedia(e.id,b,function(b){d.push(b),d.length===a.length&&c(d)}.bind(this))}.bind(this))},deleteMedia:function(a,b,c){var d,e=function(){this.sandbox.util.foreach(a,function(a){d=this.getMediaModel(a),d.destroy({success:function(){"function"==typeof b?b(a):this.sandbox.emit(n.call(this),a)}.bind(this),error:function(){this.sandbox.logger.log("Error while deleting a single media")}.bind(this)})}.bind(this))}.bind(this);c===!0?e():this.sandbox.sulu.showDeleteDialog(function(a){a===!0&&e()}.bind(this))},moveMedia:function(a,b,c){this.sandbox.util.foreach(a,function(a){this.sandbox.util.save("/admin/api/media/"+a+"?action=move&destination="+b.id,"POST").then(function(){"function"==typeof c&&c(a)}.bind(this)).fail(function(){this.sandbox.logger.log("Error while moving a single media")}.bind(this))}.bind(this))},deleteCollection:function(a,b){this.sandbox.sulu.showDeleteDialog(function(c){if(c===!0){var d=this.getCollectionModel(a);d.destroy({success:function(){"function"==typeof b?b(a):this.sandbox.emit(o.call(this),a)}.bind(this),error:function(){this.sandbox.logger.log("Error while deleting a collection")}.bind(this)})}}.bind(this))},editMedia:function(a){this.sandbox.dom.isArray(a)?1===a.length?this.editSingleMedia(a[0]):this.editMultipleMedia(a):this.editSingleMedia(a)},editSingleMedia:function(a){var b;this.medias.get(a)?(b=this.getMediaModel(a),this.sandbox.emit("sulu.media-edit.edit",b.toJSON())):(b=this.getMediaModel(a),b.fetch({success:function(a){this.sandbox.emit("sulu.media-edit.edit",a.toJSON())}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single media")}.bind(this)}))},editMultipleMedia:function(a){var b,c=[],d=function(){c.length===a.length&&this.sandbox.emit("sulu.media-edit.edit",c)}.bind(this);this.sandbox.util.foreach(a,function(a){this.medias.get(a)?(c.push(this.getMediaModel(a).toJSON()),d()):(b=this.getMediaModel(a),b.fetch({success:function(a){c.push(a.toJSON()),d()}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single media")}.bind(this)}))}.bind(this))},saveMedia:function(a,b,c){if(c!==!0){var d,e=0;this.sandbox.dom.isArray(a)||(a=[a]),this.sandbox.util.foreach(a,function(c){d=this.getMediaModel(c.id),d.set(c),d.save(null,{success:function(c){this.sandbox.emit(p.call(this),c.toJSON()),++e===a.length&&b(c.toJSON())}.bind(this),error:function(){this.sandbox.logger.log("Error while saving a single media")}.bind(this)})}.bind(this))}},renderList:function(){var a=this.sandbox.dom.createElement('<div id="collections-list-container"/>');this.sandbox.dom.append(this.$el,a),this.collections.fetch({success:function(b){this.sandbox.start([{name:"collections/components/list@sulumedia",options:{el:a,data:b.toJSON()}}])}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching all collections")}.bind(this)})},renderCollectionEdit:function(a){var b=this.sandbox.dom.createElement('<div id="collection-edit-container"/>'),c=this.getCollectionModel(this.options.id);this.sandbox.dom.append(this.$el,b),this.sandbox.sulu.saveUserSetting(f.lastVisitedCollectionKey,this.options.id),c.fetch({data:{locale:this.locale},success:function(c){a.activeTab===e.FILES?this.sandbox.start([{name:"collections/components/files@sulumedia",options:this.sandbox.util.extend(!0,{},{el:b,data:c.toJSON(),locale:this.locale},a)}]):a.activeTab===e.SETTINGS?this.sandbox.start([{name:"collections/components/settings@sulumedia",options:this.sandbox.util.extend(!0,{},{el:b,data:c.toJSON(),locale:this.locale},a)}]):this.sandbox.logger.log("Error. No valid tab "+this.options.content)}.bind(this),error:function(){this.sandbox.logger.log("Error while fetching a single collection")}.bind(this)})},startMediaEdit:function(){var a=this.sandbox.dom.createElement("<div/>");this.sandbox.dom.append(this.$el,a),this.sandbox.start([{name:"collections/components/media-edit@sulumedia",options:{el:a}}])}}});