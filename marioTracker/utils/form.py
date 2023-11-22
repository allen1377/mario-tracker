from django import forms
from django_select2.forms import ModelSelect2MultipleWidget
from ..models import Players

class WinsFilterForm(forms.Form):
    start_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    end_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    player = forms.ModelChoiceField(queryset=Players.objects.all(), empty_label='All Players', required=False)

class PlayerCreationForm(forms.ModelForm):
    class Meta:
        model = Players
        fields = ['firstname', 'lastname', 'races', 'favCharacter']
        widgets = {
            'favCharacter': forms.TextInput(),
        }
        labels = {
            'favCharacter': 'Favorite Character'
        }


class SelectPlayersReqF(forms.ModelMultipleChoiceField):
    def clean(self, value):
        cleaned_data = super().clean(value)
        num_selected = len(cleaned_data)
        if num_selected < 3:
            raise forms.ValidationError("Please select at least three Players.")
        if num_selected > 4: 
            raise forms.ValidationError("Please select at most four Players.")
        return cleaned_data
    
class PlayerSelectForm(forms.Form):
    players = forms.ModelMultipleChoiceField(
        queryset=Players.objects.all(),
        widget = ModelSelect2MultipleWidget(
            model=Players,
            search_fields=['firstname__icontains'],

        ),
        required=True,
        help_text='Select 3 or 4 players',
    )
