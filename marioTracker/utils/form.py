from django import forms
from ..models import Players

class WinsFilterForm(forms.Form):
    start_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    end_time = forms.DateTimeField(widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}), required=False)
    player = forms.ModelChoiceField(queryset=Players.objects.all(), empty_label='All Players', required=False)