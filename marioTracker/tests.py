from django.test import TestCase
import datetime
from django.urls import reverse
from django.utils import timezone

from .models import Players, Wins

# Create your tests here.

def create_player(firstname_, lastname_, wins_):
        return Players.objects.create(firstname=firstname_, lastname=lastname_, wins = wins_)

def create_win(winner):
     return Wins.objects.create(date = timezone.now(), winner = winner)

def create_mock_wins(wins, winner_id):
     for x in range(wins):
          create_win(winner_id)
          

class PlayersIndexViewTexts(TestCase):
    def test_no_players(self):
        """
        If no players exist, an appropiate message is displayed.
        """
        response = self.client.get(reverse("marioTracker:index"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "There seems to be no players.")
        self.assertQuerysetEqual(response.context["players_list"], [])

    def test_two_players(self):
         """
         The Players index may display multiple players
         """
         player1 = create_player(firstname_= "player1", lastname_= "lastname", wins_=3)
         player2 = create_player(firstname_= "player2", lastname_= "lastname2", wins_ = 5)
         response = self.client.get(reverse("marioTracker:index"))
         self.assertQuerysetEqual(
              response.context["players_list"],
              [player1, player2], ordered= False
         )

    def test_a_player(self):
         """
         Index shows one player
         """
         player1 = create_player(firstname_= "player1", lastname_= "lastname", wins_=3)
         response = self.client.get(reverse("marioTracker:index"))
         self.assertQuerysetEqual(
              response.context["players_list"],
              [player1]
         )

class DetailView(TestCase):
     def test_players(self):
          """
          The detail view of a player displayes players info
          """
          player1 = create_player(firstname_= "player1", lastname_= "lastname", wins_=3)
          create_mock_wins(player1.wins, player1.id)
          url = reverse("marioTracker:detail", args=(player1,))
          response = self.client.get(url)
          self.assertContains(response, [player1.firstname, player1.lastname, player1.wins.set.all().date])


        
    

