from django import forms
from django_select2 import forms as s2forms
from ..models import Players

class WinsFilterForm(forms.Form):
    start_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    end_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    player = forms.ModelChoiceField(queryset=Players.objects.all(), empty_label='All Players', required=False)

class PlayerCreationForm(forms.ModelForm):
    class Meta:
        model = Players
        fields = ['firstname', 'lastname', 'favCharacter']
        widgets = {
            'favCharacter': forms.TextInput(),
        }
        labels = {
            'favCharacter': 'Favorite Character'
        }
    
    
class PlayerSelectForm(forms.Form):
    players = forms.ModelMultipleChoiceField(
        queryset=Players.objects.all(),
        widget = s2forms.ModelSelect2MultipleWidget(
            model=Players,
            search_fields=['firstname__icontains'],
            attrs={'class': 'form-control select2'}
        ),
        required = True,
        help_text='Select 3 or 4 players'
    )

