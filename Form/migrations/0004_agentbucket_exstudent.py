# Generated by Django 4.0.6 on 2022-08-30 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Form', '0003_member_exstudent_alter_agentbucket_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='agentbucket',
            name='ExStudent',
            field=models.JSONField(blank=True, default=dict, null=True),
        ),
    ]