from django.urls.exceptions import NoReverseMatch
from rest_framework.reverse import reverse
from loancalculator.tests import TestMixin
from rest_framework import status
from quotes.models import Quote
from django import test


class QuotesListTest(test.TestCase, TestMixin):

    def setUp(self):
        TestMixin.setUp(self)
        self.url = reverse('quotes:quotes-list')

    def test_GET(self):
        """ Requires authentication. """
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.quote1.text)
        self.assertContains(response, self.quote2.text)

    def test_POST(self):
        """ Requires authentication. """
        data = {
            "author": "Pink Floyd",
            "text": "Goodbye Blue Sky",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['text'], data['text'])
        self.assertEqual(response.data['author'], data['author'])


class QuoteDetailsTest(test.TestCase, TestMixin):

    def setUp(self):
        TestMixin.setUp(self)
        self.url = reverse('quotes:quotes-detail', args=[self.quote1.id, ])

    def test_GET(self):
        """ Requires authentication. """
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, self.quote1.text)
        self.assertNotContains(response, self.quote2.text)

    def test_PUT(self):
        """ Requires authentication. """
        data = {
            "author": "Pink Floyd",
            "text": "Goodbye Blue Sky",
        }
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], data['text'])
        self.assertEqual(response.data['author'], data['author'])

    def test_PATCH(self):
        """ Requires authentication. """
        data = {
            "author": "Pink Floyd",
        }
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.patch(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['text'], self.quote1.text)
        self.assertEqual(response.data['author'], data['author'])

    def test_DELETE(self):
        """ Requires authentication. """
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.delete(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Quote.objects.filter(id=self.quote1.id).count(), 0)


class RandomQuoteTest(test.TestCase, TestMixin):

    def setUp(self):
        TestMixin.setUp(self)
        self.url = reverse('quotes:random')

    def test_GET(self):
        """ Requires authentication. """
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.loginAs(self.user)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
