(function () {
  /*
  LORSQUE l'on clique sur un onglet
      * ON RETIRE la class active de l'onglet actif
      * J'ajoute la class active à l'onglet actuel

      ON retire la class active sur le contenu actif
      j'ajoute la class active sur le contenu correspondant à mon clic
  */
  var afficherOnglet = function (a, animations) {
    if (animations === undefined) {
      animations = true
    }
    var li = a.parentNode
    var div = a.parentNode.parentNode.parentNode
    var activeTab = div.querySelector('.tab-content.active')
    var aAfficher = div.querySelector(a.getAttribute('href'))

    if (li.classList.contains('active')) {
      return false
    }
    // On retire la class active de l'onglet actif
    div.querySelector('.tabs .active').classList.remove('active')
    //  J'ajoute la class active à l'onglet actuel
    li.classList.add('active')

    if (animations) {
      activeTab.classList.add('fade')
      activeTab.classList.remove('in')
      var transitionend = function () {
        this.classList.remove('fade')
        this.classList.remove('active')
        aAfficher.classList.add('active')
        aAfficher.classList.add('fade')
        aAfficher.offsetWidth
        aAfficher.classList.add('in')
        this.removeEventListener('transitionend', transitionend)
        this.removeEventListener('webkitTransitionEnd', transitionend)
        this.removeEventListener('oTransitionEnd', transitionend)
        this.removeEventListener('mozTransitionEnd', transitionend)
      }
      activeTab.addEventListener('transitionend', transitionend)
      activeTab.addEventListener('webkitTransitionEnd', transitionend)
      activeTab.addEventListener('oTransitionEnd', transitionend)
      activeTab.addEventListener('mozTransitionEnd', transitionend)
    } else {
      aAfficher.classList.add('active')
      aAfficher.classList.remove('active')
    }
    // On ajoute la class fade sur l'élément actif
    // A la fin de l'animation
    //     On retire la class fade et active
    //     On ajoute la class active et fade à l'élément à afficher
    //     ON ajoute la class in
  }
  var tabs = document.querySelectorAll('.tabs a')
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
      afficherOnglet(this)
    })
  }
  /*
  JE RECUPERE le hash
  AJOUTER LA CLASS active sur le lien href="hash"
  RETIRER LA CLASS active sur les autres onglets
  AFFICHER / Masquer les contenus
  */
  var hashChange = function (e) {
    var hash = window.location.hash
    var a = document.querySelector('a[href="' + hash + '"]')
    if (a !== null && !a.parentNode.classList.contains('active')) {
      afficherOnglet(a, e !== undefined)
    }
  }

  window.addEventListener('hashchange', hashChange)
  hashChange()
})()
