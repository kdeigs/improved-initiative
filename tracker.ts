/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="typings/knockout/knockout.d.ts" />
/// <reference path="typings/mousetrap/mousetrap.d.ts" />

/// <reference path="custombindinghandlers.ts" />
/// <reference path="userresponse.ts" />
/// <reference path="statblock.ts" />
/// <reference path="creature.ts" />
/// <reference path="playercharacter.ts" />
/// <reference path="encounter.ts" />
/// <reference path="rules.ts" />
/// <reference path="library.ts" />
/// <reference path="libraryimporter.ts" />

module ImprovedInitiative {
  export var uiText = {
    'LegendaryActions': 'Legendary Actions',
    'DamageVulnerabilities': 'Damage Vulnerabilities',
    'DamageResistances': 'Damage Resistances',
    'DamageImmunities': 'Damage Immunities',
    'ConditionImmunities': 'Condition Immunities'
  }
  
  class ViewModel{
    Encounter = ko.observable<Encounter>(new Encounter());
    Library = ko.observable<ICreatureLibrary>(new CreatureLibrary());
  }
  
  function RegisterKeybindings(viewModel: ViewModel){
    Mousetrap.bind('j',viewModel.Encounter().SelectNextCombatant);
    Mousetrap.bind('k',viewModel.Encounter().SelectPreviousCombatant);
    Mousetrap.bind('n',viewModel.Encounter().NextTurn);
    Mousetrap.bind('alt+n',viewModel.Encounter().PreviousTurn);
    Mousetrap.bind('t',viewModel.Encounter().FocusSelectedCreatureHP);
    Mousetrap.bind('g',viewModel.Encounter().AddSelectedCreatureTag)
    Mousetrap.bind('del',viewModel.Encounter().RemoveSelectedCreature);
    Mousetrap.bind('f2', viewModel.Encounter().EditSelectedCreatureName);
    Mousetrap.bind('alt+r',viewModel.Encounter().RollInitiative);
    Mousetrap.bind('alt+j',viewModel.Encounter().MoveSelectedCreatureDown);
    Mousetrap.bind('alt+k',viewModel.Encounter().MoveSelectedCreatureUp);
  }
  
  $(() => {
      var viewModel = new ViewModel();
      RegisterKeybindings(viewModel);
      ko.applyBindings(viewModel);
      $.ajax("db.xml").done(xml => {
        
        var library = LibraryImporter.Import(xml);
        viewModel.Library().Add(library);
        
        $('.fa.preview').hover(e => {
          viewModel.Library().PreviewCreature(ko.dataFor(e.target));
          var popPosition = $(e.target).position().top;
          var maxPopPosition = $(document).height() - $('.preview.statblock').height();
          if(popPosition > maxPopPosition){
            popPosition = maxPopPosition - 10;
          }
          $('.preview.statblock').css('top', popPosition);
        }, e => {
          viewModel.Library().PreviewCreature(null);
        });
      })
      
  });
}