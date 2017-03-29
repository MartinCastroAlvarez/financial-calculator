from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework import test
from quotes.models import Quote
from keys.models import Key


class TestMixin(object):

    def setUp(self):
        """

        Tests factory.

        Attributes:
        ------------------
        :client: Web client.
        :url: API Test URL.
        :quote1: Test Quote.
        :quote2: Test Quote.
        :key1: Test Key.
        :key2: Test Key.
        :user: Authenticated User.

        Methods:
        ------------------
        :setUp: Run initial setup.
        :loginAs: Login as User.
        :test_GET: Test GET method is not implemented.
        :test_POST: Test POST method is not implemented.
        :test_PATCH: Test PATCH method is not implemented.
        :test_PUT: Test PUT method is not implemented.
        :test_DELETE: Test DELETE method is not implemented.
        :test_HEAD: Test HEAD method is not implemented.
        :test_OPTIONS: Test OPTIONS method is not implemented.

        """

        """ Open web connection. """
        self.client = test.APIClient()

        """ URL for this test. """
        self.url = None

        """ Create an admin Member. """
        self.user = User()
        self.user.username = "martin"
        self.user.first_name = "martin"
        self.user.last_name = "castro"
        self.user.email = "martincastro.10.5@gmail.com"
        self.user.set_password("asdfadsf")
        self.user.save()

        """ Crate test Quotes. """
        self.quote1 = Quote(text="asdf", author="asdf")
        self.quote1.save()
        self.quote2 = Quote(text="2344", author="2345")
        self.quote2.save()

        """ Crate test Keys. """
        self.key1 = Key(url="http://a.com", username="fudu", title="hd89", password="828j")
        self.key1.save()
        self.key2 = Key(url="http://b.com", username="f98d", title="d8d8", password="d88d")
        self.key2.save()

    def loginAs(self, user):
        """ Login as user. """
        token, created = Token.objects.get_or_create(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_GET(self):
        """ Test GET request is not implemented. """
        if not self.url:
            return
        response = self.client.get(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_POST(self):
        """ Test POST request is not implemented. """
        if not self.url:
            return
        response = self.client.post(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_PUT(self):
        """ Test PUT request is not implemented. """
        if not self.url:
            return
        response = self.client.put(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_PATCH(self):
        """ Test PATCH request is not implemented. """
        if not self.url:
            return
        response = self.client.patch(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_DELETE(self):
        """ Test DELETE request is not implemented. """
        if not self.url:
            return
        response = self.client.delete(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_OPTIONS(self):
        """ Test OPTIONS request is not implemented. """
        if not self.url:
            return
        response = self.client.options(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_200_OK,
                                             status.HTTP_401_UNAUTHORIZED])

    def test_HEAD(self):
        """ Test HEAD request is not implemented. """
        if not self.url:
            return
        response = self.client.head(self.url, {}, format='json')
        self.assertIn(response.status_code, [status.HTTP_405_METHOD_NOT_ALLOWED,
                                             status.HTTP_200_OK,
                                             status.HTTP_401_UNAUTHORIZED])
