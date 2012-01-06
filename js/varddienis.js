﻿// Copyrights © 2010-2012 Arvis Lācis
// arvis.lacis@inbox.lv | http://twitter.com/arvislacis | http://arvislacis.com | http://varddienis.blogspot.com
/*jslint white: true, evil: true, plusplus: true, sloppy: true, indent: 4, maxerr: 50 */
/*global $: false, setTimeout: false */

// Datu masīvi
var ned_d = ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"],
	menesi = ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"],
	menIn = ["janvārī", "februārī", "martā", "aprīlī", "maijā", "jūnijā", "jūlijā", "augustā", "septembrī", "oktobrī", "novembrī", "decembrī"],
	d_sk = [-1, 30, 58, 89, 119, 150, 180, 211, 242, 272, 303, 333, 364],
	plnm = {0 : 103, 52 : 92, 105 : 81, 157 : 100, 210 : 89, 263 : 107, 315 : 97, 368 : 86, 421 : 105, 473 : 94, 526 : 83, 578 : 102, 631 : 91, 684 : 80, 736 : 99, 789 : 88, 842 : 106, 894 : 96, 947 : 85},
	v = ["Solvita, Laimnesis, Solvija,", "Ivo, Indulis, Ivis, Iva,", "Miervaldis, Ringolds, Miervalda,", "Ilva, Spodra, Ilvita,", "Zintis, Sīmanis,", "Arnita, Spulga,", "Zigmārs, Rota, Juliāns, Digmārs,",
		"Gatis, Ivanda,", "Kaspars, Aksels, Alta,", "Tatjana, Dorisa,", "Smaida, Franciska,", "Reinis, Renāts, Reinholds, Reina,", "Harijs, Āris, Aira, Ārijs,", "Roberts, Raitis, Roberta, Raits,",
		"Fēlikss, Felicita,", "Lidija, Lida,", "Tenis, Dravis,", "Antons, Antonijs, Antis,", "Alnis, Andulis,", "Oļģerts, Aļģirds, Orests, Aļģis,", "Agnese, Agnija, Agne,", "Austris,",
		"Grieta, Strauta, Rebeka,", "Ksenija, Krišs, Eglons,", "Zigurds, Sigurds, Sigvards,", "Ansis, Agnis, Agneta,", "Ilze, Ildze, Izolde,", "Kārlis, Spodris,", "Aivars, Valērijs,", "Valentīna, Pārsla, Tīna,",
		"Tekla, Violeta,", "Indra, Brigita, Indars, Indris,", "Sonora, Spīdola,", "Ida, Aīda, Vida,", "Veronika, Daila, Dominiks,", "Agate, Selga, Silga, Sinilga,", "Dace, Dārta, Dora,",
		"Rihards, Ričards, Nelda, Rišards,", "Česlavs, Aldona,", "Simona, Apolonija,", "Paula, Paulīne, Jasmīna,", "Laima, Laimdota,", "Līna, Karlīna,", "Melita, Malda,", "Valentīns,",
		"Olafs, Aloizs, Alvils, Olavs,", "Jūlija, Džuljeta,", "Donats, Donāts, Konstance,", "Kintija, Kora,", "Zane, Zuzanna,", "Vitauts, Smuidra, Smuidris,", "Eleonora, Ariadne,",
		"Ārija, Adrians, Adrija, Adriāna, Rigonda,", "Haralds, Almants,", "Diāna, Dina, Dins,", "Alma, Annemarija,", "Evelīna, Aurēlija, Mētra,", "Līva, Līvija, Andra,", "Skaidrīte, Skaidra, Justs,", "Ivars, Ilgvars,",
		"Laila, Luīze, Lavīze,", "Tālis, Marts, Tālavs,", "Alise, Enija, Auce,", "Austra, Aurora,", "Vents, Centis, Gotfrīds,", "Ella, Elmīra,", "Dagmāra, Margita, Marga,", "Ēvalds,", "Silvija, Liliāna, Laimrota,",
		"Konstantīns, Agita,", "Aija, Aivis, Aiva,", "Ernests, Balvis,", "Matilde, Ulrika,", "Imalda, Amalda, Amilda,", "Guntis, Guntars, Guntris,", "Gerda, Ģertrūde, Gertrūde,", "Ilona, Adelīna,", "Jāzeps, Juzefa,",
		"Irbe, Made,", "Una, Benedikts, Unigunde, Dzelme, Benedikta,", "Tamāra, Gabriela, Gabriels, Dziedra,", "Žanna, Mirdza, Žanete,", "Kazimirs, Izidors,", "Māra, Mārīte, Marita,", "Ženija, Eiženija,",
		"Gustavs, Gusts, Tālrīts,", "Gunta, Ginta, Gunda,", "Agija, Aldonis,", "Ilgmārs, Nanija, Igmārs,", "Gvido, Atvars,", "Dagnis, Dagne,", "Irmgarde, Imgarde,", "Dairis, Daira,", "Valda, Herta, Ārvalds, Ārvalda,",
		"Vija, Aivija, Vidaga,", "Zinta, Filips, Dzinta, Vīlips,", "Zinaīda, Helmuts, Zina,", "Edgars, Dana, Danute, Dans,", "Alla, Valērija, Žubīte,", "Anita, Anitra, Zīle, Annika,", "Vilmārs, Hermanis,",
		"Ainis, Jūlijs,", "Nauris, Egils, Egīls,", "Strauja, Gudrīte,", "Aelita, Gastons,", "Bernadeta, Mintauts, Alfs,", "Rūdolfs, Rūdis, Viviāna,", "Laura, Jadviga,", "Vēsma, Fanija,", "Ziedīte, Mirta,",
		"Anastasija, Marģers,", "Armands, Armanda,", "Juris, Jurģis, Georgs,", "Visvaldis, Nameda, Ritvaldis,", "Līksma, Bārbala,", "Alīna, Sandris, Rūsiņš,", "Raimonda, Raina, Klementīne, Tāle,", "Gundega, Terēze,",
		"Raimonds, Vilnis, Laine,", "Lilija, Liāna,", "Ziedonis,", "Zigmunds, Zigismunds, Sigmunds,", "Gints, Uvis,", "Viola, Vizbulīte, Vijolīte,", "Ģirts, Ģederts,", "Didzis, Gaidis,", "Henrijs, Jete, Henriete,",
		"Staņislavs, Staņislava, Stefānija,", "Ervīns, Einārs, Klāvs,", "Maija, Paija,", "Milda, Karmena, Manfreds,", "Ināra, Ina, Valija, Inārs,", "Irīna, Irēna, Ira, Iraīda,", "Krišjānis, Aivita, Elvita, Elfa,",
		"Sofija, Arita, Taiga, Airita,", "Edvīns, Edijs,", "Herberts, Dailis, Umberts,", "Inese, Ēriks, Inesis,", "Lita, Sibilla, Teika,", "Salvis, Venta, Selva,", "Ingmārs, Ernestīne, Akvelīna,",
		"Emīlija, visi kalendārā neiekļauto vārdu īpašnieki,", "Leontīne, Lonija, Leokādija, Ligija,", "Ilvija, Marlēna, Ziedone,", "Junora, Anšlavs,", "Eduards, Edvards, Varis, Edvarts,",
		"Dzidra, Gunita, Loreta, Dzidris,", "Vilis, Vilhelms,", "Raivis, Raivo, Maksis, Maksims,", "Lolita, Vitolds, Letīcija,", "Alīda, Jūsma,", "Biruta, Mairita, Bernedīne,", "Emma, Lība,", "Inta, Ineta, Intra,",
		"Sintija, Sindija, Elfrīda,", "Igors, Ingvars, Margots,", "Ingrīda, Ardis,", "Arnis, Gaida, Arno,", "Frīdis, Frīda, Mundra,", "Ligita, Gita, Felicijans,", "Anatolijs, Anatols, Malva,", "Ingus, Mairis, Vidvuds,",
		"Nora, Ija, Lenora,", "Ainārs, Zigrīds, Uva,", "Saiva, Tija, Santis, Sentis, Saivis,", "Vilija, Vits, Baņuta, Žermēna,", "Justīne, Juta,", "Artūrs, Artis,", "Alberts, Madis,", "Viktors, Nils,",
		"Rasma, Maira, Rasa,", "Emīls, Egita, Monvīds,", "Ludmila, Laimdots, Laimiņš,", "Līga,", "Jānis,", "Maiga, Milija, Maigone,", "Ausma, Inguna, Inguns, Ausmis, Ingūna,", "Malvīne, Malvis,", "Viesturs, Kitija, Viestards,",
		"Pēteris, Pauls, Paulis, Pāvils,", "Mareks, Tālivaldis,", "Imants, Intars, Ingars, Rimants,", "Lauma, Ilvars, Halina,", "Benita, Everita, Verita, Emerita,", "Uldis, Sandis, Sandijs, Ulvis,",
		"Edīte, Andžejs, Esmeralda, Andžs,", "Arkādijs, Anrijs,", "Maruta, Alda,", "Antra, Adele, Ada,", "Zaiga, Asne, Asna,", "Lija, Olivers, Olīvija, Odrija,", "Leonora, Svens,", "Ints, Indriķis, Namejs,",
		"Margarita, Margrieta,", "Oskars, Ritvars, Anvars,", "Egons, Egija, Henrihs, Henriks, Egmonts,", "Estere, Hermīne,", "Aleksejs, Aleksis, Alekss,", "Rozālija, Roze,", "Jautrīte, Digna, Kamila, Sāra,", "Ramona, Ritma,",
		"Melisa, Meldra, Meldris,", "Marija, Marina, Marika, Marī,", "Mērija, Magdalēna, Magda, Magone,", "Kristīne, Kristiāna, Krista, Kristiāns, Kristīna,", "Jēkabs, Žaklīna,", "Anna, Annija, Ance,", "Marta, Dita, Dite,",
		"Cilda, Cecīlija,", "Edmunds, Edžus, Vidmants,", "Renārs, Valters, Regnārs,", "Ruta, Rūta, Sigita, Angelika,", "Albīna, Albīns,", "Normunds, Stefans,", "Augusts,", "Romāns, Romualds, Romualda,", "Osvalds, Arvils,",
		"Askolds, Aisma,", "Alfrēds, Madars, Fredis,", "Vladislavs, Mudīte, Vladislava,", "Madara, Genoveva, Genovefa,", "Inuta, Audris, Brencis,", "Olga, Zita, Liega, Zigita,", "Vizma, Klāra,", "Elvīra, Velga, Rēzija,",
		"Zelma, Virma, Zemgus,", "Zenta, Zelda, Dzelde,", "Astra, Astrīda,", "Oļegs, Vineta,", "Liene, Helēna, Elena, Liena, Ellena,", "Melānija, Imanta,", "Boriss, Bernhards, Rojs,", "Linda, Janīna,", "Rudīte, Everts,",
		"Vitālijs, Ralfs, Valgudis,", "Boļeslavs, Bērtulis,", "Patrīcija, Ivonna, Ludvigs, Ludis, Patriks,", "Natālija, Broņislava, Broņislavs, Tālija,", "Žanis, Alens, Jorens,", "Auguste, Guste,", "Aiga, Armīns, Vismants,",
		"Jolanta, Samanta, Alvis,", "Aigars, Vilma,", "Ilmārs, Iluta, Austrums,", "Elīza, Lizete, Zete,", "Berta, Bella,", "Dzintra, Dzintars, Dzintara,", "Klaudija, Vaida, Persijs,", "Maigonis, Magnuss, Mariuss,",
		"Regīna, Ermīns,", "Ilga,", "Bruno, Telma,", "Jausma, Albertīne,", "Signe, Signija,", "Evita, Eva, Erna,", "Izabella, Iza,", "Santa, Sanita, Sanda, Sanija, Sandija,", "Sandra, Gunvaldis, Sondra, Gunvaris,",
		"Asja, Asnate, Dāgs, Dārgs,", "Vera, Vaira, Vairis,", "Elita, Liesma, Alita,", "Verners, Muntis,", "Marianna, Guntra, Ginters,", "Modris, Matīss, Mariss,", "Māris, Maigurs, Mārica,", "Vanda, Veneranda, Venija,",
		"Agris, Agrita,", "Rodrigo, Rauls,", "Gundars, Kurts, Knuts,", "Ilgonis, Ādolfs,", "Sergejs, Svetlana, Lana,", "Mihails, Mikus, Miks, Miķelis,", "Elma, Menarda, Elna,", "Lāsma, Zanda, Zandis,", "Ilma, Skaidris,",
		"Elza, Ilizana,", "Francis, Modra, Dmitrijs,", "Amālija, Amēlija,", "Monika, Zilgma, Zilga,", "Daumants, Druvvaldis,", "Aina, Anete, Dženeta,", "Elga, Helga, Elgars,", "Arvīds, Arvis, Druvis,", "Monta, Silva, Tince,",
		"Kira, Valfrīds,", "Irma, Mirga,", "Vilhelmīne, Minna,", "Helvijs, Hedviga, Eda,", "Daiga, Dinija, Dinārs,", "Karīna, Gaitis, Gaits,", "Rolands, Ronalds, Erlends, Rolanda,", "Elīna, Drosma, Drosmis,", "Leonīds, Leonīda,",
		"Urzula, Severīns,", "Īrisa, Airisa, Irīda,", "Dainis, Daina, Dainida,", "Renāte, Modrīte, Mudrīte,", "Beāte, Beatrise,", "Amanda, Kaiva, Amanta,", "Lilita, Irita, Ita,", "Ņina, Antoņina, Oksana, Ninona,",
		"Laimonis, Elvis, Elvijs, Elva, Laimis,", "Nadīna, Ulla, Adīna,", "Rinalds, Valts, Rinalda,", "Ikars,", "Vivita, Viva, Dzīle,", "Ērika, Dagnija,", "Atis, Oto, Otomārs,", "Šarlote, Lote,",
		"Leons, Linards, Leonards, Leonarda, Leo,", "Lotārs, Helma,", "Aleksandra, Agra,", "Teodors,", "Mārtiņš, Mārcis, Markuss, Marks,", "Ojārs, Nellija, Rainers,", "Kaija, Kornēlija,", "Jevgeņijs, Eižens, Jevgeņija,",
		"Fricis, Vikentijs, Vincents,", "Undīne, Leopolds, Unda,", "Glorija, Banga,", "Uģis, Hugo, Uga,", "Aleksandrs, Doloresa,", "Elizabete, Betija, Līze, Liza,", "Anda, Andīna,", "Andis, Zeltīte,", "Aldis, Alfons, Aldris,",
		"Zigrīda, Zigfrīda, Zigfrīds,", "Velta, Velda,", "Katrīna, Kate, Katrīne, Kadrija, Trīne,", "Konrāds, Sebastians,", "Lauris, Norberts,", "Rita, Vita, Olita,", "Ignats, Virgīnija,", "Andrejs, Andris, Andrievs,",
		"Arnolds, Emanuels,", "Sniedze, Meta,", "Evija, Raita, Jogita,", "Baiba, Barbara, Barba,", "Sabīne, Sarma, Klaudijs,", "Nikolajs, Niks, Niklāvs, Nikola,", "Antonija, Anta, Dzirkstīte,", "Vladimirs, Gunārs, Gunis,",
		"Sarmīte, Tabita,", "Guna, Judīte,", "Valdis, Voldemārs, Valdemārs,", "Iveta, Otīlija,", "Lūcija, Veldze,", "Auseklis, Gaisma,", "Jana, Hanna, Johanna,", "Alvīne,", "Hilda, Teiksma,",
		"Kristaps, Kristers, Krists, Kristofers, Klinta,", "Lelde, Sarmis,", "Arta, Minjona,", "Toms, Tomass, Saulcerīte,", "Saulvedis,", "Viktorija, Balva,", "Ieva, Ādams,", "Larisa, Stella,", "Megija, Dainuvīte, Gija,",
		"Inita, Elmārs, Helmārs,", "Inga, Ivita, Ingeborga, Irvita,", "Solveiga, Ilgona,", "Daniels, Dāvis, Daniela, Dāvids, Dāniels,", "Kalvis, Silvestrs, Silvis,", "Solvita, Laimnesis, Solvija,"],
	sv_d = {0 : "Jaungada diena",
		120 : "Darba svētki<br/>Latvijas Republikas Satversmes sapulces sasaukšanas diena",
		123 : "Latvijas Republikas Neatkarības atjaunošanas diena",
		173 : "Līgo diena",
		174 : "Jāņu diena",
		357 : "Ziemassvētku priekšvakars",
		358 : "Pirmie Ziemassvētki",
		359 : "Otrie Ziemassvētki",
		364 : "Vecgada diena"},
	at_d = {5 : "Zvaigznes diena",
		19 : "1991. gada barikāžu aizstāvju atceres diena",
		25 : "Latvijas Republikas starptautiskās <em>(de jure)</em> atzīšanas dienu",
		66 : "Starptautiskā sieviešu diena",
		72 : "Vārddieņa autora <em>(Arvja Lāča)</em> dzimšanas diena",
		83 : "Komunistiskā genocīda upuru piemiņas diena",
		127 : "Nacisma sagrāves dienu un Otrā pasaules kara upuru piemiņas diena",
		128 : "Eiropas diena",
		134 : "Starptautiskā ģimenes diena",
		136 : "Ugunsdzēsēju un glābēju diena",
		151 : "Starptautiskā bērnu aizsardzības diena",
		164 : "Komunistiskā genocīda upuru piemiņas diena",
		167 : "Latvijas Republikas okupācijas diena",
		172 : "Varoņu piemiņas diena <em>(Cēsu kaujas atceres diena)</em>",
		184 : "Ebreju tautas genocīda upuru piemiņas diena",
		222 : "Latvijas brīvības cīnītāju piemiņas diena",
		232 : "Konstitucionālā likuma \"Par Latvijas Republikas valstisko statusu\" pieņemšanas un Latvijas Republikas faktiskās neatkarības atjaunošanas diena",
		234 : "Staļinisma un nacisma upuru atceres diena",
		243 : "Zinību diena",
		264 : "Baltu vienības diena",
		273 : "Starptautiskā veco ļaužu diena",
		303 : "Helovīni",
		314 : "Lāčplēša diena",
		322 : "Starptaustiskā vīriešu diena"};

// Noformējuma fn
function nof() {
	$(".v").css({"color" : "blue", "font-weight" : "bold"});
	$(".sv").css({"color" : "darkred"});
	$(".at").css({"color" : "dargrey", "font-style" : "italic"});
	
	$(".datums").css({"text-align" : "left"});
	$(".laiks").css({"text-align" : "right"});
	$(".v_d, .d_info, .svetki, .tikli, #mdpv, #mdpv_i, #mvpd_i").css({"text-align" : "center"});
	
	$(".d2").css({"font-weight" : "bold"});
}

// Šodienas fn
function sodiena() {
	var d = new Date(),
		gads = d.getFullYear(),
		gada_i,
		men = d.getMonth(),
		die = d.getDate(),
		n_d = d.getDay(),
		stu = d.getHours(),
		min = d.getMinutes(),
		sek = d.getSeconds(),
		snr = d_sk[men] + die,
		sod = (v[d_sk[men] + die]).slice(0, -1),
		rit = (v[d_sk[men] + die + 1]).slice(0, -1),
		die_g,
		atl_d,
		gal1 = "šas",
		gal2 = "s",
		sve = "",
		atz = "",
		dati = Math.floor((gads / 19 - Math.floor(gads / 19)) * 1000),
		plnm_d = plnm[dati],
		plnm_s = snr - plnm_d;
	// Pareiza datuma un laika izvadīšana
	if (min < 10) {
		min = "0" + min;
	}
	
	if (sek < 10) {
		sek = "0" + sek;
	}
	
	$(".datums").html(ned_d[n_d] + ", " + gads + ". gada " + die + ". " + menesi[men]);
	$(".laiks").html(stu + ":" + min + ":" + sek);
	
	// Garais, īsais gads
	if (gads % 4 === 0) {
		if (gads % 100 === 0) {
			if (gads % 400 === 0) {
				gada_i = 0;
			} else {
			    gada_i = 1;
			}
		} else {
			gada_i = 0;
		}
	} else {
        gada_i = 1;
	}
	
	// Vārda dienu izvadīšana
	if (gada_i === 0 && men === 1 && die === 28) {
		$(".v_d").html("Šodien vārda dienu svin <span class='v'>" + sod + ".</span><br />Rīt vārda dienu neviens nesvinēs.");
	} else {
		if (gada_i === 0 && men === 1 && die === 29) {
			$(".v_d").html("Šodien vārda dienu neviens nesvin.<br/>Rīt vārda dienu svinēs <span class='v'>" + sod + ".</span>");
		} else {
			$(".v_d").html("Šodien vārda dienu svin <span class='v'>" + sod + ".</span><br />Rīt vārda dienu svinēs <span class='v'>" + rit + ".</span>");
		}
	}
	
	// Dienas informācija
	if (gada_i === 0) {
		if (men > 1) {
			die_g = snr + 2;
			atl_d = 366 - die_g;
		} else {
			die_g = snr + 1;
			atl_d = 366 - die_g;
		}
	} else {
		die_g = snr + 1;
		atl_d = 365 - die_g;
	}
	
	if (atl_d % 10 === 1 && atl_d % 100 !== 11) {
		gal1 = "si";
		gal2 = "";
	}
	
	$(".d_info").html("Gada <span class='d2'>" + die_g + "</span>. diena. Līdz gada beigām atliku" + gal1 + " <span class='d2'>" + atl_d + "</span> diena" + gal2 + ".");
	
	if (men === 2 && die > 23 && die < 31 && n_d === 6 && stu > 15) {
		$(".d_info").html($(".d_info").html() + "<br/><strong>Neaizmirstiet šonakt pagriezt pulksteņus vienu stundu uz priekšu</strong>.");
	}
	if (men === 9 && die > 23 && die < 31 && n_d === 6 && stu > 15) {
		$(".d_info").html($(".d_info").html() + "<br/><strong>Neaizmirstiet šonakt pagriezt pulksteņus vienu stundu atpakaļ</strong>.");
	}
	
	// Svētki
	if (sv_d[snr] !== undefined) {
		sve = sv_d[snr] + "<br/>";
	}
	
	if (men === 4 && die > 7 && die < 15 && n_d === 0) {
		sve = sve + "Mātes diena<br/>";
	}
	if (snr > plnm_d && plnm_s < 6 && n_d === 5) {
		sve = sve + "Lielā piektdiena<br/>";
	}
	if (snr > plnm_d && plnm_s < 8 && n_d === 0) {
		sve = sve + "Pirmās Lieldienas<br/>";
	}
	if (plnm_s > 1 && plnm_s < 9 && n_d === 1) {
		sve = sve + "Otrās Lieldienas<br/>";
	}
	if (plnm_s > 49 && plnm_s < 57 && n_d === 0) {
		sve = sve + "Vasarsvētki<br/>";
	}
	if (snr === 321) {
		sve = sve + "Latvijas Republikas Proklamēšanas diena (" + (gads - 1918) + ". gadadiena)<br/>";
	}
	
	if (at_d[snr] !== undefined) {
		atz = at_d[snr] + "<br/>";
	}
	if (snr > plnm_d && plnm_s < 5 && n_d === 4) {
		atz = atz + "Zaļā ceturtdiena<br/>";
	}
	if (gada_i === 1 && snr === 139) {
		atz = atz + "Tviterdiena (gada 140. diena) <a href='http://twitterday.org/lv/'>#twitterday</a><br/>";
	} else {
		if (gada_i === 0 && snr === 138) {
			atz = atz + "Tviterdiena (gada 140. diena) <a href='http://twitterday.org/lv/'>#twitterday</a><br/>";
		}
	}
	if (men === 5 && die > 14 && die < 22 && n_d === 0) {
		atz = atz + "Ugunsdzēsēju un glābēju diena<br/>";
	}
	if (men === 6 && die > 7 && die < 15 && n_d === 6) {
		atz = atz + "Jūras svētku diena<br/>";
	}
	if (men === 6 && die > 24 && n_d === 5) {
		atz = atz + "Sistēmas administratoru diena <a href='http://www.sysadminday.com'>#SysAdminDay</a><br/>";
	}
	if (men === 7 && die === 31) {
		atz = atz + "Blogotāju diena <a href='http://www.blogday.org'>#BlogDay</a><br/>";
	}
	if (men === 8 && die === 9) {
		atz = atz + "Testētāju diena<br/>";
	}
	if (gada_i === 1 && snr === 255) {
		atz = atz + "Programmētāju diena (gada 256. diena) <a href='http://www.programmerday.info'>#ProgrammerDay</a><br/>";
	} else {
		if (gada_i === 0 && snr === 254) {
			atz = atz + "Programmētāju diena (gada 256. diena) <a href='http://www.programmerday.info'>#ProgrammerDay</a><br/>";
		}
	}
	if (men === 8 && die > 7 && die < 15 && n_d === 0) {
		atz = atz + "Tēva diena<br/>";
	}
	if (men === 9 && die > 0 && die < 8 && n_d === 0) {
		atz = atz + "Skolotāju diena<br/>";
	}
	if (men === 10 && die > 7 && die < 15 && n_d === 2) {
		atz = atz + "Sociālo darbinieku diena<br/>";
	}
	if (men === 11 && die > 0 && die < 8 && n_d === 0) {
		atz = atz + "Pret latviešu tautu vērstā totalitārā komunistiskā režīma genocīda upuru piemiņas diena<br/>";
	}
	
	if (die === 13 && n_d === 5) {
		atz = atz + "Melnā piektdiena<br/>";
	}
	
	$(".svetki").html("<span class='sv'>" + sve + "</span><span class='at'>" + atz + "</span>");
	
	nof();
	setTimeout(sodiena, 1000);
}

// MDPV fn
function mdpv() {
	var pv, pvm, pvp, i, i2, m, r;
	
	if ($("#mdpv").val() === "") {
		$("#mdpv_i").html("&nbsp;");
	} else {
		pv = $("#mdpv").val();
		pvm = pv.toLowerCase();
		pvp = pvm.charAt(0).toUpperCase() + pvm.slice(1);
		
		m = new RegExp(pvp + ",");
		
		for (i = 0; i < 365; i++) {
			if ((r = m.exec(v[i])) !== null) {
				for (i2 = 0; i2 < 13; i2++) {
					if (i <= d_sk[i2]) {
						$("#mdpv_i").fadeOut(400, function () {
							$(this).html("<span class='v'>" + (r.toString()).slice(0, -1) + "</span> savu vārda dienu svin <span class='d2'>" + (i - d_sk[i2 - 1]) + ". " + menIn[i2 - 1] + "</span>.").fadeIn(800, nof());
						});
						break;
					}
				}
				break;
			}
		}
		
		if (i === 365) {
			$("#mdpv_i").html("<span class='v'>" + pvp + "</span> savu vārda dienu svin <span class='d2'>22. maijā</span> vai arī šāds vārds neeksistē.");
			nof();
		}
	}
}

// MVPD fn
function mvpd() {
	var d, m;
	
	d = parseInt($("#mvpd").val(), 0);
	m = parseInt($("#mvpm").val(), 0);
	
	if ((m === 4 && d === 31) || (m === 6 && d === 31) || (m === 9 && d === 31) || (m === 11 && d === 31)) {
		$("#mvpd").val(30).slider("refresh");
		d = 30;
	} else if (m === 2 && d > 28) {
		$("#mvpd").val(28).slider("refresh");
		d = 28;
	}
	
	$("#mvpd_i").fadeOut(400, function () {
		$(this).html("<span class='d2'>" + d + ". " + menIn[m - 1] + "</span> savu vārda dienu svin <span class='v'>"  + (v[d_sk[m - 1] + d]).slice(0, -1) + "</span>.").fadeIn(800, nof());
	});
}

// Galvenā fn
$(function () {
	sodiena();
	nof();
	
	$("a").click(function () {
		$(this).fadeTo("slow", 0.5).fadeTo("def", 1);
	});
	
	$("#mdpv").keyup(function () {
		mdpv();
	});
	
	$("#mdpvp").click(function () {
		mdpv();
	});
	
	$("#msod").click(function () {
		var	d = new Date(),
			men = d.getMonth() + 1,
			die = d.getDate();
		
		$("#mvpd").val(die).slider("refresh");
		$("#mvpm").val(men).slider("refresh");
	});
	
	$("#mvpdp").click(function () {
		mvpd();
	});
});