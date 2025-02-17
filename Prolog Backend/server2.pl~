%% Inference Engine (This Processes Knowledge and Makes Decisions)

:- use_module(library(http/http_cors)).
:- set_setting(http:cors, ['*']).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_json)).
:- use_module(library(assoc)).  % For empty_assoc/1
:- ensure_loaded('plants.pl'). % Load the plant knowledge base.

%% ------------------------------
%% 1.The query-matching mechanism (matches_conditions/2) that checks user-provided
%% conditions against the knowledge base.

%% 2. It follows a rule-based reasoning approach to find suitable plants.

%% 3. The inference engine filters through all available rules (facts) 
%% and returns only those that match the user's query.
%% ------------------------------

%% Helper Predicate: matches_conditions/2
%%
%% Succeeds if all key-value pairs in Query are present and equal in Conditions.
%% ------------------------------
matches_conditions(Conditions, Query) :-
    dict_pairs(Query, _, Pairs),
    forall(member(Key-Value, Pairs),
           ( get_dict(Key, Conditions, PlantValue),
             PlantValue == Value
           )
    ).

%% ------------------------------
%% HTTP Handler for Chat Queries
%% ------------------------------
:- http_handler(root(chat), chat_handler, []).

chat_handler(Request) :-
    cors_enable,  % Enable CORS by adding the appropriate header
    % Extract query parameters; all are optional.
    http_parameters(Request, [
        sunlight(Sunlight, [atom, optional(true)]),
        soil(Soil, [atom, optional(true)]),
        maintenance(Maintenance, [atom, optional(true)]),
        hardiness_zone(Hardiness, [atom, optional(true)]),
        soil_ph(SOILPH, [atom, optional(true)]),
        drainage(Drainage, [atom, optional(true)]),
        irrigation_needs(Irrigation, [atom, optional(true)]),
        drought_tolerance(Drought, [atom, optional(true)]),
        light_availability(LightAvailability, [atom, optional(true)]),
        plant_light_needs(PlantLight, [atom, optional(true)]),
        size_at_maturity(Size, [atom, optional(true)]),
        growth_rate(GrowthRate, [atom, optional(true)]),
        pruning(Pruning, [atom, optional(true)]),
        pest_resistance(Pest, [atom, optional(true)]),
        bloom_time(Bloom, [atom, optional(true)]),
        native(Native, [atom, optional(true)]),
        biodiversity(Biodiversity, [atom, optional(true)]),
        wind_exposure(Wind, [atom, optional(true)]),
        slope_elevation(Slope, [atom, optional(true)]),
        purpose(Purpose, [atom, optional(true)]),
        wildlife_habitat(Wildlife, [atom, optional(true)])
    ]),

    % Build a query dict from provided parameters.
    build_query([ sunlight-Sunlight,
                  soil-Soil,
                  maintenance-Maintenance,
                  hardiness_zone-Hardiness,
                  soil_ph-SOILPH,
                  drainage-Drainage,
                  irrigation_needs-Irrigation,
                  drought_tolerance-Drought,
                  light_availability-LightAvailability,
                  plant_light_needs-PlantLight,
                  size_at_maturity-Size,
                  growth_rate-GrowthRate,
                  pruning-Pruning,
                  pest_resistance-Pest,
                  bloom_time-Bloom,
                  native-Native,
                  biodiversity-Biodiversity,
                  wind_exposure-Wind,
                  slope_elevation-Slope,
                  purpose-Purpose,
                  wildlife_habitat-Wildlife
                ], _{}, Query),

    % Find all plant recommendations that match the Query conditions.
    findall(Recommendations,
            ( plant(Conditions, Recommendations),
              matches_conditions(Conditions, Query)
            ),
            ListOfRecs),
    flatten(ListOfRecs, FlatRecommendations),
    ( FlatRecommendations \= [] ->
      reply_json_dict(_{answer: FlatRecommendations})
    ; reply_json_dict(_{answer: ["No suitable plants found"]})
    ).

%% ------------------------------
%% Helper: build_query/3
%% Given a list of Key-Value pairs (with Value possibly unbound), produce a dict
%% with only those pairs where Value is not a variable.
%% ------------------------------
build_query([], Query, Query).
build_query([Key-Value|Rest], Acc0, Query) :-
    ( var(Value) ->
        Acc1 = Acc0
    ;
        % Use put_dict/4 to add the key-value pair.
        put_dict(Key, Acc0, Value, Acc1)
    ),
    build_query(Rest, Acc1, Query).

%% ------------------------------
%% HTTP Handler for Available Parameters
%%
%% This handler listens at /parameters and expects a query parameter "key".
%% It returns a JSON dict with available options for that key.
%% ------------------------------
:- http_handler(root(parameters), parameters_handler, []).

parameters_handler(Request) :-
    cors_enable,
    http_parameters(Request, [
        key(Key, [string])
    ]),
    available_options(Key, Options),
    reply_json_dict(_{parameters: Options}).

%% ------------------------------
%% The available options for specific parameters.
%% Also helps when giving data to the plant knowlege base.
%% ------------------------------

available_options("sunlight", ["full", "partial", "shade"]).
available_options("soil", ["sandy", "clay", "loamy", "acidic", "bark", "peaty", "silty", "rocky", "chalky", "sandy loam"]).
available_options("maintenance", ["low", "medium", "high"]).
available_options("hardiness_zone", ["zone 2 to 11", "zone 3 to 9", "zone 3", "zone 3 to 10", "zone 5 to 9", "zone 5 to 10", "zone 6", "zone 7", "zone 8"]).
available_options("soil_ph", ["slightly acidic", "neutral", "acidic", "alkaline"]).
available_options("drainage", ["good", "moderate", "excellent", "poor"]).
available_options("irrigation_needs", ["low", "moderate", "high", "regular"]).
available_options("drought_tolerance", ["low", "moderate", "high"]).
available_options("light_availability", ["full", "partial", "shade"]).
available_options("plant_light_needs", ["full", "partial", "shade"]).
available_options("size_at_maturity", ["small", "medium", "large"]).
available_options("growth_rate", ["fast", "moderate", "slow"]).
available_options("pruning", ["low", "medium", "high"]).
available_options("pest_resistance", ["high", "moderate"]).
available_options("bloom_time", ["spring", "summer", "fall", "none"]).
available_options("native", ["yes", "no"]).
available_options("biodiversity", ["high", "moderate", "low"]).
available_options("wind_exposure", ["low", "moderate", "high"]).
available_options("slope_elevation", ["low", "moderate", "high"]).
available_options("purpose", ["edible", "ornamental", "culinary"]).
available_options("wildlife_habitat", ["yes", "no"]).


% Add additional parameter options here...
available_options(_, []).  % For unknown keys, return an empty list.

%% ------------------------------
%% Start the Server
%% ------------------------------
start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).
