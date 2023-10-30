-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Kwi 2023, 21:09
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `testportal`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `answers` longtext NOT NULL,
  `data` longtext NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `answers`
--

INSERT INTO `answers` (`id`, `code`, `answers`, `data`, `time`) VALUES
(6, '2udIH1', 'KQVgQqYHYK4DZ1AEWAJgMKTagMgewCcBTAWzQAYBLABwGcYzVyATPOQi2ygFwoEMSRXhgoBjPFFpFR3ITAL9mNSrVGUoAcwpE4PNJiZTmFVtsoxaJPMaayS1Dk3VqlzGFGHkYnuHwBGhETanqzsxBQkfBpQfPy6AI4wfAB0FEgS0sEU1pR4FNQ6cEQeRLSJQUxKAhQAbmze1Hye4iRWpoZENuREGqXcfLSpTAAK8DXqfApMQpTVTFASFIlz5L6iFpwWBVBKtFIUAGZ8MGp+G04lBG6M5A70ROFMYaRD5ACyA7SxhnzUlMWHY6nc7dTxWIq0bj-fiiQ5EGAaWaeIwUIoyEE1PqUM5wBivACiMAoCygJlmN2oAAsBoUMVicQxUYEbiimAQVBZXgBFGAqbRQSg3dgBAhQ2icUQ6B4qcpwgiCDx4igAZV+-1J80yP0R3DFcUoyxukQhSWY33IfmxxWu-AI61eAEFBJ5YAhzUc1LouBFCJaKHZqCDZusvRR5DFXsrOv7SIHxUxw+ahPlqcRuAQUhQeStKF0inkLrUeHwKuRuPI-vHyJE9ubWd0igryyRXgA1SbmKtWAh+6YCm6wKCwphHE7YkHmgoIYqyMowUtcbivdASDTzpa8uelnp9AZknMa8iTe0UMC+HZ6WwVvlMdYEehV9QUamiV4AOUWt4kUhkcimR+0DMXRWJpUWkcsq0TExNwJIkmBISgKEtPxrUZTVZWmXpIQGR1nVRE4INqYpiiaG9VnAkFImiTMmCjG51FkXp-3GfpSwAKwsbgC26XowSiCMKAAMT4T0VEQ28MyrA4HibNDyBybj4ThBEkXyNNzAHbFKVSEB0FJXSoA+aQSKrKlJiEDMxAkGo+AQMi7nnR5q19cTyO4qD4LYLFS1A6ZGxnJUmHwYgblCRxyHrcZMQISynDoOTB1fCgAHklHczxikFJDzyUTw6lxbhGj44yYirfKGl8i0csvI8EiSG4ZgEV4AElDwFPxKQiY52SrO8Hy63UVFeJBNzDEJyQ3FZXV8fJCEGriCFeYLSAoGh6FCthwsXfhnVeYTRK4Mr6kKyq+iI3QMqw-oqzcVzcz2kTKC9VzGtCyhohULg3pWRIyMyoU8BFPVDElIoevKd8tP9ObwtzfVyh8CjTIIPAn3mKH0doRAvwvWSWwofF+2JIgMPIcqTs8ET-WcXN3Dy4sF1jB4NyGgmLolKVwfXeDuvswoZ1KUnAzgcYYn-KcihKLdn38YsPB9HtKGXazbNDJgHIeUtu17NywwIGIfQhKEfIy-zFXxpgeT+opKGknZJpuPglErNRNCLVi1NRqBHVN0gAoauDyA9J6xKresFIVnXft6vBWmsPA9pk-3sjS7RA+klTKuodSEoxqh4pucRJBJpIXRUbGyZ0V5hhRtHyHazrMYroulDx1bmFeAAJWX+nlzzFf9HqoVJqQoCRrJNQgx0EW51YRIxShotismGaszRZ6UnGpGWSnhyDnRWaYfFeIiVzs69zhoyeK0UeV4ud8v+xmaYKKHmXmIhRv7iOMhbjfECZMhgeA6T0qAPSAAVa8j5Dyb2rK5ZCqEBwl23FdPcOM1ylmjqTHc2FBgUHQPIfqbIORVkqvAdMlBJRdlcgGIMT8rj-CXBQB0dpA4sRLNoM2zYxDyB7vId2HD5juCSpbUaTBKTWmIOyEIm1-xUQNphIQBIXRyCrIA6stlSimndAIUoMJ-RQMhh1MQkl8hjAmHIpowN67CMvl0Pw1UfBfyMY3MstIuxeUhNCIRQ5iSfiqnwC8fFaz8iypqER5AVzF1-OWf8TtlCqHUFoPyNVbpVgoV4kebBdBqHLEoNqedtpMF0c0WObQE5pAmkwaOoSAZAzIqoTmMpZ7SXlMnSovJYIqDaKiR6ApzSVRqcQohEUr5k3gIGfosgU65DGpGMZ8BfAkHEAQAociXLUyHLTPu8l9bmVeJA1ZZEaxfE2S4Om0FXLeGyHspyaJCJAMprtCgAAlEhxJFkrB3J4aSaseLqMSpGawmjIIZUDlIeiJQmICPYpxRSJ8ebUQOTTNwOzEpmJFhYzgaoATTCcWuGaCY3TLMIGsrqJonY0XIMfdRkR5D2VTBZJMnhyHsioT7FmVYeogkihM7wTRSwRwTBlfsbZV6GAsGoP4nhZAIEorzUh+4jQlklKVOxtS5kqjGXDDo9CKDcugc+SR0omEGTAVAN8edRCmPVuYsWA1rHoo6B3IS7JNBPUJbcakUg5VSSBOOMOoNpTSz8kQW21oTAZD3tnGYckah8qmUQXC6if5cUjWPPe-0lW1ATQKsaKZzLpipQ6TwBqixLwGc7FQrtklHk8HXWVuJoGMWfvvTOyIg1cyTRQGuJZR7IiZv+DOiJKoN3VbazF9r1a10PBoDM4wzRGp2FImq9zOQUHAUPA0s95F1hqiUsxBAQRzr4Au80QyAlBIMUc3qhD120S2NaT6pZWWUL0UwE9Z6yTohuAcSV3amDgNjHQtZSgAWfPJVoyl+R+ZS2wezRRnhP25nNOsC25BRhHrDoO7QCKWBiLrTGX1-AWV7IegdF6UIVhKA+nsMJLAqnkGjiA-Sek3kjIzcpEd9bDytLburPA9wnIeXrtIaugnHI+T3tcreJdKoQrJS-Reb9zQfwJAh-DZEMnD1nrQbJlCeAwHycSQp+68Jfjju0GxbpAQUdeG8fTpC6orBk7cOaUIFpgW4uaKoLJ9O5KM+oZNPzHrPS7PxZljGAzhUIGoNO9mIv6PVmsB4lVMReIZEKcePN6WQTgBQqhgFBMHOA2o1B2Guj1jLdO2N6GHTOYpPIHlZn1G4nRHgpgSBGMXqzU8QGc0GmduaQB8gOA+mzBI5y-V7znU5rgJMvNTAhVeBFYKR0tp1g8PvAvD26Cd0Kr2m6xENnhWRxoSii5xSZ6lgYg8G0L8D5gu6dYdTftzYYtFpMYIjGSQO16esMOj6Lx7FLKOYEza7tyQ1sQAk5WuolTQV6wty8i42TsqZCTmszteb1go5yRt-iJ3bWpWrJnjFxXWmvbepcTNY3OiTqEck11VkNCx81DpRBoa+IeIpR5zPWc9cHZ62PbClfmRmh5oJiaS9pSC7RgJBCkL3rEysuHdwQ6Yq8AAqqU++NPdWKZXhW4kKxdAoRRhQVNf8+AAORC1phTAtf5bZe+iKUQeDWNi65OsQ2Q23Ca9hvViHLkdfeFYvm044Ozx1fXPOC1PNOC6LZbdrWkYHJhv+Fugp2lz1dhN6pBHMQVweIJ9NWojwROEmOM4ir1awdnCPe39nVHw3qpwsNdsugIVWm1CDAmhMjfxJCMMxKVmG++R8k7QdQtiW+9R96Ao6PfTq3vYdqlZtPGy5XDL8A5KREGqHqJ1PKp0p6h83xe3SyL9cuwhckrlAO-IG+PvtUU+rZuPH8KlUgQJ68Hs8-ESHwFKi6dekeDeG8GmE+H686KGPCfmagZEMQXEEM+CNq-uk6X2PMB+AB46l6uUqIX8tQx0RUdiBIQEMGYBgss88SLsSSVklmikGmlUgooGjCly9mNCpWq09CYGLoL+xoUGIBtw9eVB24F0w0C+n09GemZoEI+a0w4KK0FwLazE4q5AVuauj+R+4Ef4igCSNanCqSBG2mKenA-mhmxm6MHU6mNUvK82-K0y8ErkvOJSQwqAyAyAQAA', 'KQdgQsBMkGYJYCcDOAXAdgQwLYFMqWAGYBBfAE2zgzXygGF8kBXBTXWk-AcyZVsgbQAxgBsMSJB1LQAjACMADrRAARIA', '2023-04-19 20:16:16'),
(7, 'Z9pBg5', 'KQVgQqYHYK4DZ1AEWAJgMKTagLgQwGttk1NwcAnGAU1IDM84BnWjB52kFLoA', 'KQdgQsBMkGYJYCcDOAXAdgQwLYFMqWAGYBBfAE2zgzXygGF8kBXBTXWk-AcyZVsgbQAxgBsMSJB1LQAjACMADrRAARIA', '2023-04-19 20:16:16');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `exports`
--

CREATE TABLE `exports` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'Brak Nazwy',
  `code` varchar(255) DEFAULT '',
  `data` longtext DEFAULT '',
  `answers` longtext DEFAULT '',
  `uid` varchar(50) NOT NULL,
  `pid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `exports`
--

INSERT INTO `exports` (`id`, `title`, `code`, `data`, `answers`, `uid`, `pid`) VALUES
(6, '3213', '', 'KQdgQsBMkC4JYwDYFMqWAZgIJoDIHsAnZAWygAYBJABwGcBXM6KAYTX2vnwDta1McAVgjg08JKmbY8RUhRoMm6SG2gwAntUnpp0WgAsiMfirTIUJPlKERBAEVAPTotQhT9dkAAr4AJgEMAKwoCYiYqOkYTVVhNbQE0RB4Ac2izCysdG2B7RxyHEDsgA', 'KQVgQqYHYK4DZ1AEWAJgMKTagjKgzDtsskA', 'roORkOo121', '2udIH1'),
(7, 'Testujemy!', '', 'KQdgQsBMkC4JYwDYFMqWAZgIJpsgzjGlAMJoD2ADvOQHb7HbACsE4uCKjO0ehxkMrwCelVNEw9I+ABbkATkQmC0yFAFsGEpqxYARUAZXtenceia8CMfOmVDYo85LSyFSuw7XJN3FhGYDECMyE1gzP2hKSkwAMQEHGCdI6ThaAHMue1UNLQscXSiY7OgARjtPNAAWDAr9Q3rgoA', 'KQVgQqYHYK4DZ1AEWAJgMKTagKgUwGsBnAF22TU3BICcY9KAzAQziIYxbYZBV6A', 'roORkOo121', 'Z9pBg5');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `projekty`
--

CREATE TABLE `projekty` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf16_unicode_ci DEFAULT 'Brak Nazwy',
  `data` longtext COLLATE utf16_unicode_ci DEFAULT '[]',
  `uid` varchar(10) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf16_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf16_unicode_ci NOT NULL,
  `uid` varchar(10) COLLATE utf16_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `uid`) VALUES
(11, 'rocket5115', 'Testportal123', 'roORkOo121');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `exports`
--
ALTER TABLE `exports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pid` (`pid`);

--
-- Indeksy dla tabeli `projekty`
--
ALTER TABLE `projekty`
  ADD PRIMARY KEY (`id`),
  ADD KEY `unique_id` (`uid`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`username`),
  ADD UNIQUE KEY `unique_id` (`uid`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `exports`
--
ALTER TABLE `exports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `projekty`
--
ALTER TABLE `projekty`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
